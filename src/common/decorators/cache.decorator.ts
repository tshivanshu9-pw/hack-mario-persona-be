import { CacheService } from '../cache/cache.service';
import { CacheMapper } from '../cache/cache.mapper';
import { PpContextService } from 'src/core/services/context.service';

export type TtlCache<T> = {
  func: (key: string, ttl: number) => Promise<T>;
  key: string; //if null is provided cache will not be used
  ttl: number;
};

export type HkeyCache<T> = {
  func: (hKey: string, key: string) => Promise<T>;
  key: string;
  hKey: string;
};

export type DeleteKey = { hKey?: string; key?: string | string[] };

export async function useCache<T = any>(
  getCacheConfig: (mapper: CacheMapper) => TtlCache<T> | HkeyCache<T>,
) {
  const cacheService = PpContextService.context.get(CacheService);
  const cacheMapper = PpContextService.context.get(CacheMapper);
  const config = getCacheConfig(cacheMapper);

  let result: T = null;

  if ((config as HkeyCache<T>).hKey && (config as HkeyCache<T>).key) {
    const { func, hKey, key } = config as HkeyCache<T>;
    result = await cacheService.hGet(hKey, key);
    if (!result) {
      result = await func(hKey, key);
      //set cache without blocking
      if (result) cacheService.hSet(hKey, key, result);
    }
  } else if ((config as TtlCache<T>).key && (config as TtlCache<T>).ttl) {
    const { func, key, ttl } = config as TtlCache<T>;
    result = await cacheService.get(key);
    if (!result) {
      result = await func(key, ttl);
      //set cache without blocking
      if (result) cacheService.set(key, result, ttl);
    }
  } else {
    result = await config.func(null, null as never);
  }

  return result;
}

export function deleteCache(
  getCacheKey: (mapper: CacheMapper) => DeleteKey | DeleteKey[],
) {
  const cacheService = PpContextService.context.get(CacheService);
  const cacheMapper = PpContextService.context.get(CacheMapper);
  const cacheConfig = getCacheKey(cacheMapper);
  if (cacheConfig) {
    //delete cache without blocking
    if (Array.isArray(cacheConfig)) {
      cacheConfig.map(({ hKey, key }) => {
        if (hKey) {
          if (key) cacheService.hDel(hKey, key);
          else cacheService.del(hKey);
        } else cacheService.del(key);
      });
    } else {
      const { hKey, key } = cacheConfig;
      if (hKey) {
        if (key) cacheService.hDel(hKey, key);
        else cacheService.del(hKey);
      } else cacheService.del(key);
    }
  }
}

export function UseCache(
  getCacheKey: (
    mapper: CacheMapper,
    ...args: any[]
  ) => { hKey: string; key: string } | { key: string; ttl: number },
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = target[propertyKey];
    descriptor.value = async function (...args: any[]) {
      const method = originalMethod.bind(this);
      return useCache((mapper) => {
        return {
          func: (a, b) => method(...args),
          ...getCacheKey(mapper, ...args),
        };
      });
    };
  };
}

export function DeleteCache(
  getCacheKey: (
    mapper: CacheMapper,
    ...args: any[]
  ) =>
    | { hKey: string; key: string | string[] }
    | { hKey: string; key: string | string[] }[]
    | { key: string }
    | { key: string }[],
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = target[propertyKey];
    descriptor.value = async function (...args: any[]) {
      const method = originalMethod.bind(this);
      deleteCache((mapper) => {
        return getCacheKey(mapper, ...args);
      });
      return method(...args);
    };
  };
}
