import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpConfigService } from 'src/boostrap/http.config.service';
import { KafkaConfigService } from 'src/boostrap/kafka.config';
import { PpLogger } from 'src/boostrap/logger.service';
import { MongoDBConfigService } from 'src/boostrap/mongodb.config.service';
import { service_name } from 'src/common/constants';
import { MessageGateway } from 'src/dummy-implementations/gateway/message.gateway';
import configuration from '../config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: '.env'
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useClass: HttpConfigService,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongoDBConfigService,
    }),
    ClientsModule.registerAsync([
      {
        name: service_name.kafka.name,
        imports: [ConfigModule],
        useClass: KafkaConfigService,
      },
    ]),
  ],
  providers: [MessageGateway, PpLogger],
  exports: [ConfigModule, MongooseModule, HttpModule, ClientsModule],
})
export class CoreModule {}
