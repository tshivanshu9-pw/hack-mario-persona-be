import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseTransformerInterceptor } from './common/interceptors/response.interceptor';
import { PpLoggerService } from './common/logger/logger.service';
import { PpContextService } from './core/services/context.service';
import { PpLoggingInterceptor } from './common/interceptors/logger.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // bufferLogs: true,
  });

  app.useLogger(new PpLoggerService(NestApplication.name));
  app.setGlobalPrefix('saarthi-dev');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validateCustomDecorators: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new ResponseTransformerInterceptor(),
    new PpLoggingInterceptor(),
  );

  PpContextService.context = app;

  const config = new DocumentBuilder()
    .setTitle('Saarthi')
    .setDescription('Saarthi')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/saarthi-dev/api', app, document);

  const port = app.get<ConfigService>(ConfigService).get('port') || 3000;
  await app.listen(port);

  console.log(`App listening on port ${port}`);
}

bootstrap();
