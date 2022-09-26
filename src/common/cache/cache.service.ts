import { Injectable } from '@nestjs/common';
import { PpLoggerService } from 'src/common/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { RedisClientType } from '@redis/client';
import { createClient } from 'redis';
import { ApmSpan } from 'src/common/decorators/apm.decorator';

@Injectable()
export class CacheService {
  private client: RedisClientType;
  isClientConnected = false;

  enableCache = false;
  ENABLE_DISABLE_KEY = 'SAARTHI_CACHE_ENABLE_DISABLE_KEY';
  ENABLE_DISABLE_CHANNEL = 'SAARTHI_CACHE_ENABLE_DISABLE_CHANNEL';
  ENABLE_MESSAGE = 'SAARTHI_CACHE_ENABLE_MESSAGE';
  DISABLE_MESSAGE = 'SAARTHI_CACHE_DISABLE_MESSAGE';

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
      this.client = createClient({
        url: redisConfig.url,
        socket: {
          reconnectStrategy: (retries) => {
            if (retries == redisConfig.retries) {
              return new Error('The server refused the connection');
            } else {
              this.logger.debug('Retrying...', retries + 1);
              return retries;
            }
          },
        },
      });
      this.client.on('error', (err) => {
        this.logger.error('Redis Client Error: ', err);
        this.isClientConnected = false;
      });
      await this.client.connect();
      this.isClientConnected = true;
      this.logger.debug('Redis Client Connected Successfuly');

      //check whether cache is disabled
      const message = await this.client.get(this.ENABLE_DISABLE_KEY);
      if (message == this.DISABLE_MESSAGE) {
        this.enableCache = false;
        this.logger.log('Cache is Disabled');
      }
    } catch (error) {
      this.logger.error('Redis Client Connection Error: ', error);
      this.isClientConnected = false;
    }

    try {
      //////////initialize subscriber/////////////
      const subscriber = this.client.duplicate();
      subscriber.on('error', (err) => {
        this.logger.error('Redis Subscriber Error: ', err);
      });
      await subscriber.connect();

      //subscribe to enable disable cache Channel
      await subscriber.subscribe(this.ENABLE_DISABLE_CHANNEL, (message) => {
        if (message == this.ENABLE_MESSAGE) {
          this.enableCache = true;
          this.logger.log('Cache is Enabled');
        } else if (message == this.DISABLE_MESSAGE) {
          this.enableCache = false;
          this.logger.log('Cache is Disabled');
        } else {
          this.logger.log(
            `Unknown message from pubsub channel: ${this.ENABLE_DISABLE_CHANNEL}, message: ${message}`,
          );
        }
      });

      this.logger.debug('Redis Subscriber Connected Successfuly');
    } catch (error) {
      this.logger.error('Redis Subscriber Connection Error: ', error);
    }
  }

  async enable() {
    try {
      await this.client.set(this.ENABLE_DISABLE_KEY, this.ENABLE_MESSAGE);
      await this.client.publish(
        this.ENABLE_DISABLE_CHANNEL,
        this.ENABLE_MESSAGE,
      );
      return;
    } catch (error) {
      this.logger.error('Enable Cache Error: ', error);
    }
  }
  async disable() {
    try {
      await this.client.set(this.ENABLE_DISABLE_KEY, this.DISABLE_MESSAGE);
      await this.client.publish(
        this.ENABLE_DISABLE_CHANNEL,
        this.DISABLE_MESSAGE,
      );
      return;
    } catch (error) {
      this.logger.error('Disable Cache Error: ', error);
    }
  }

  async get(key: string) {
    try {
      if (!(this.enableCache && this.isClientConnected)) {
        this.logger.debug('Redis Client Not Connected');
        return null;
      }
      const data = await this.client.get(key);
      if (data) {
        this.logger.debug(`found cache for key: ${key}`);
        return JSON.parse(data);
      }
    } catch (error) {
      this.logger.error(
        'get Error:',
        error,
        'arguments: ',
        JSON.stringify(arguments),
      );
      return null;
    }
  }

  async set(key: string, data: any, ttl?: number) {
    try {
      if (!(this.enableCache && this.isClientConnected)) {
        this.logger.debug('Redis Client Not Connected');
        return null;
      }
      data = JSON.stringify(data);
      await this.client.set(key, data);
      if (!ttl) ttl = 60 * 60 * 24;
      await this.client.expire(key, ttl);
      return null;
    } catch (error) {
      this.logger.error(
        'set Error:',
        error,
        'arguments: ',
        JSON.stringify(arguments),
      );
      return null;
    }
  }

  @ApmSpan()
  async hGet(hKey: string, key: string) {
    try {
      if (!(this.enableCache && this.isClientConnected)) {
        this.logger.debug('Redis Client Not Connected');
        return null;
      }
      const data = await this.client.hGet(hKey, key);
      if (data) {
        this.logger.debug(`found cache for hKey: ${hKey}, key: ${key}`);
        return JSON.parse(data);
      }
    } catch (error) {
      this.logger.error(
        'hGet Error:',
        error,
        'arguments: ',
        JSON.stringify(arguments),
      );
      return null;
    }
  }

  async hSet(hKey: string, key: string, data: any) {
    try {
      if (!(this.enableCache && this.isClientConnected)) {
        this.logger.debug('Redis Client Not Connected');
        return null;
      }
      data = JSON.stringify(data);
      await this.client.hSet(hKey, key, data);
      const todayAt12 = new Date().setHours(23, 59, 59, 999);
      this.client.expireAt(hKey, Math.floor(todayAt12 / 1000));
      return null;
    } catch (error) {
      this.logger.error(
        'hSet Error:',
        error,
        'arguments: ',
        JSON.stringify(arguments),
      );
      return null;
    }
  }

  async hDel(hKey: string, key: string | string[]) {
    try {
      if (!(this.enableCache && this.isClientConnected)) {
        this.logger.debug('Redis Client Not Connected');
        return null;
      }
      const data = await this.client.hDel(hKey, key);
      if (data)
        this.logger.debug(`deleted cache for hKey: ${hKey}, key: ${key}`);
      return;
    } catch (error) {
      this.logger.error(
        'hDel Error:',
        error,
        'arguments: ',
        JSON.stringify(arguments),
      );
      return null;
    }
  }

  async del(key: string | string[]) {
    try {
      if (!(this.enableCache && this.isClientConnected)) {
        this.logger.debug('Redis Client Not Connected');
        return null;
      }
      if (key.length && Array.isArray(key)) {
        key.forEach(async (element) => {
          const data = await this.client.del(element);
          if (data) this.logger.debug(`deleted cache for key: ${element}`);
          return;
        });
      } else {
        const data = await this.client.del(key);
        if (data) this.logger.debug(`deleted cache for key: ${key}`);
        return;
      }
    } catch (error) {
      this.logger.error(
        'del Error:',
        error,
        'arguments: ',
        JSON.stringify(arguments),
      );
      return null;
    }
  }

  async lPush(lkey: string, data: any) {
    try {
      if (!(this.enableCache && this.isClientConnected)) {
        this.logger.debug('Redis Client Not Connected');
        return null;
      }
      data = JSON.stringify(data);
      await this.client.lPush(lkey, data);
      return;
    } catch (error) {
      this.logger.error(
        'lPush Error:',
        error,
        'arguments: ',
        JSON.stringify(arguments),
      );
      return null;
    }
  }

  async lRange(lKey: string, start = 0, stop = -1) {
    try {
      if (!(this.enableCache && this.isClientConnected)) {
        this.logger.debug('Redis Client Not Connected');
        return null;
      }
      const data = await this.client.lRange(lKey, start, stop);
      return data;
    } catch (error) {
      this.logger.error(
        'lRange Error:',
        error,
        'arguments: ',
        JSON.stringify(arguments),
      );
      return null;
    }
  }
}
