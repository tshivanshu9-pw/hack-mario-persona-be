import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongoDBMarioConfig implements MongooseOptionsFactory {
  static connectionName = 'mariohackathon';
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    return {
      uri: this.configService.get<string>('database.mariohackathon'),
      retryAttempts: Number.MAX_VALUE,
      retryDelay: 500,
      maxPoolSize: 50,
      minPoolSize: 10,
      socketTimeoutMS: 45000,
    };
  }
}
