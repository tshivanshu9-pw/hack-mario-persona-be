import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongoDBSaarthiConfig implements MongooseOptionsFactory {
  static connectionName = 'saarthi';
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    return {
      uri: this.configService.get<string>('database.saarthi'),
      // maxPoolSize: 100,
      // minPoolSize: 10,
      // socketTimeoutMS: 3000,
    };
  }
}
