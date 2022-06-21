import { PpContextService } from 'src/core/services/context.service';
import { CacheMapper } from '../cache/cache.mapper';
import { CacheService } from '../cache/cache.service';

export async function useCache<T = any>(
  getCacheConfig: (mapper: CacheMapper) => {
    func: (hKey?: string, key?: string, ttl?: number) => Promise<T>;
    hKey: string;
    key: string;
    ttl?: number;
  },
) {
  const cacheService = PpContextService.context.get(CacheService);
  const cacheMapper = PpContextService.context.get(CacheMapper);
  const { func, hKey, key, ttl } = getCacheConfig(cacheMapper) || {};

  let result: T = null;
  if (hKey && key) {
    result = await cacheService.hGet(hKey, key);
    if (!result) {
      result = await func(hKey, key, ttl);
      if (result) {
        //set cache without blocking
        if (ttl) cacheService.hSet(hKey, key, result, ttl);
        else cacheService.hSet(hKey, key, result);
      }
    }
  } else {
    result = await func();
  }
  return result;
}

export function deleteCache(
  getCacheKey: (
    mapper: CacheMapper,
  ) =>
    | { hKey: string; key: string | string[] }
    | { hKey: string; key: string | string[] }[],
) {
  const cacheService = PpContextService.context.get(CacheService);
  const cacheMapper = PpContextService.context.get(CacheMapper);
  const cacheConfig = getCacheKey(cacheMapper);
  if (cacheConfig) {
    //delete cache without blocking
    if (Array.isArray(cacheConfig)) {
      cacheConfig.map(({ hKey, key }) => {
        cacheService.hDel(hKey, key);
      });
    } else {
      const { hKey, key } = cacheConfig;
      cacheService.hDel(hKey, key);
    }
  }
}

export function UseCache(
  getCacheKey: (
    mapper: CacheMapper,
    ...args: any[]
  ) => { hKey: string; key: string; ttl?: number },
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
          func: (hKey, key, ttl) => method(...args),
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
    | { hKey: string; key: string | string[] }[],
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
