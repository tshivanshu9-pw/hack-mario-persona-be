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
      // maxPoolSize: 100,
      // minPoolSize: 10,
      // socketTimeoutMS: 3000,
    };
  }
}
