import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheMapper } from 'src/common/cache/cache.mapper';
import { CacheService } from 'src/common/cache/cache.service';
import { GrpcExceptionFilter } from 'src/common/filters/grpc-exception.filter';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { GrpcResponseInterceptor } from 'src/common/interceptors/grpc-response.interceptor';
import { ResponseTransformerInterceptor } from 'src/common/interceptors/http-response.interceptor';
import { PpLoggerService } from 'src/common/logger/logger.service';
import { HttpUtilService } from 'src/common/utils/http-util.service';
import { MongoDBSaarthiConfig } from 'src/config/db.config.service';
import { HttpConfigService } from 'src/config/http.config.service';
import configuration from '../config/env.config';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useClass: HttpConfigService,
    }),
    MongooseModule.forRootAsync({
      useClass: MongoDBSaarthiConfig,
      connectionName: MongoDBSaarthiConfig.connectionName,
    }),
  ],
  providers: [
    PpLoggerService,
    HttpUtilService,
    CacheService,
    CacheMapper,
    HttpExceptionFilter,
    ResponseTransformerInterceptor,
    GrpcExceptionFilter,
    GrpcResponseInterceptor,
  ],
  exports: [HttpUtilService, PpLoggerService, CacheService, CacheMapper],
})
export class CoreModule {}
