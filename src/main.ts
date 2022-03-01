import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseTransformerInterceptor } from './common/interceptors/response.interceptor';
import { PpLogger } from './boostrap/logger.service';
import { PpContextService } from './core/services/context.service';
import { PpLoggingInterceptor } from './common/interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new PpLogger(),
    // bufferLogs: true,
  });

  // app.useLogger(new MyLogger(NestApplication.name));

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new ResponseTransformerInterceptor());

  app.useGlobalInterceptors(new PpLoggingInterceptor());

  PpContextService.context = app;

  const port = app.get<ConfigService>(ConfigService).get('port') || 3000;
  await app.listen(port);

  console.log(`App listening on port ${port}`);
}

bootstrap();
