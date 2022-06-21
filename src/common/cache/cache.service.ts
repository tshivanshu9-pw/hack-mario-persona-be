import { Injectable } from '@nestjs/common';
import { PpLoggerService } from 'src/boostrap/logger.service';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';
import { RedisClientType } from '@redis/client';

@Injectable()
export class CacheService {
  private client: RedisClientType;
  enableCache = true;
  isClientConnected = false;

  constructor(
    private logger: PpLoggerService,
    private configService: ConfigService,
  ) {
    this.logger.setContext(CacheService.name);
    this.connect();
  }

  private async connect() {
    try {
      const redisConfig = this.configService.get('redis');
      this.client = createClient(redisConfig);
      this.client.on('error', (err) => {
        this.logger.log('Redis Client Error', err);
        this.isClientConnected = false;
      });
      await this.client.connect();
      this.isClientConnected = true;
    } catch (error) {
      this.logger.log(error);
    }
  }

  async hGet(hKey: string, key: string) {
    try {
      if (!(this.enableCache && this.isClientConnected)) return null;
      const data = await this.client.hGet(hKey, key);
      if (data) {
        this.logger.verbose(`found cache for hKey: ${hKey}, key: ${key}`);
        return JSON.parse(data);
      }
    } catch (error) {
      this.logger.error(error);
      this.logger.error('arguments: ', ...arguments);
      return null;
    }
  }
  // async hGetAll(hKey: string) {
  //   try {
  //     if (!(this.enableCache && this.isClientConnected)) return null;
  //     const data = await this.client.hGetAll(hKey);
  //     return data;
  //   } catch (error) {
  //     this.logger.error(error);
  //     return null;
  //   }
  // }
  async hSet(hKey: string, key: string, data: any, ttl?: number) {
    try {
      if (!(this.enableCache && this.isClientConnected)) return null;
      data = JSON.stringify(data);
      await this.client.hSet(hKey, key, data);
      if (!ttl) ttl = 60 * 60 * 24;
      await this.client.expire(key, ttl);
      return null;
    } catch (error) {
      this.logger.error(error);
      this.logger.error('arguments: ', ...arguments);
      return null;
    }
  }

  async hDel(hKey: string, key: string | string[]) {
    try {
      if (!(this.enableCache && this.isClientConnected)) return null;
      const data = await this.client.hDel(hKey, key);
      if (data)
        this.logger.verbose(`deleted cache for hKey: ${hKey}, key: ${key}`);
      return;
    } catch (error) {
      this.logger.error(error);
      this.logger.error('arguments: ', ...arguments);
      return null;
    }
  }

  async del(key: string | string[]) {
    try {
      if (!(this.enableCache && this.isClientConnected)) return null;
      const data = await this.client.del(key);
      if (data) this.logger.verbose(`deleted cache for key: ${key}`);
      return;
    } catch (error) {
      this.logger.error(error);
      this.logger.error('arguments: ', ...arguments);
      return null;
    }
  }

  async lPush(lkey: string, data: any) {
    try {
      if (!(this.enableCache && this.isClientConnected)) return null;
      data = JSON.stringify(data);
      await this.client.lPush(lkey, data);
      return;
    } catch (error) {
      this.logger.error(error);
      this.logger.error('arguments: ', ...arguments);
      return null;
    }
  }

  async lRange(lKey: string, start = 0, stop = -1) {
    try {
      if (!(this.enableCache && this.isClientConnected)) return null;
      const data = await this.client.lRange(lKey, start, stop);
      return data;
    } catch (error) {
      this.logger.error(error);
      this.logger.error('arguments: ', ...arguments);
      return null;
    }
  }
}
