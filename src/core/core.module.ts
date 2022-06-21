import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ClientsModule } from '@nestjs/microservices';
// import { KafkaConfigService } from 'src/config/kafka.config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PpLoggerService } from 'src/boostrap/logger.service';
import { HttpUtilService } from 'src/common/utils/http-util.service';
import configuration from '../config/env.config';
import { HttpConfigService } from 'src/config/http.config.service';
import { MongoDBConfigService } from 'src/config/mongodb.config.service';
import { CacheService } from 'src/common/cache/cache.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
    MongooseModule.forRootAsync({
      useClass: MongoDBConfigService,
    }),
    // ClientsModule.registerAsync([
    //   {
    //     name: service_name.kafka.name,//we can use config
    //     imports: [ConfigModule],
    //     useClass: KafkaConfigService,
    //   },
    // ]),
  ],
  providers: [PpLoggerService, HttpUtilService, CacheService],
  exports: [
    HttpUtilService,
    PpLoggerService,
    //  CacheService
  ],
})
export class CoreModule {}
