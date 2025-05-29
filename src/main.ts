import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { ResponseTransformerInterceptor } from 'src/common/interceptors/http-response.interceptor';
import { PpContextService } from 'src/core/services/context.service';
import * as glob from 'glob';
import { GrpcExceptionFilter } from 'src/common/filters/grpc-exception.filter';
import { GrpcResponseInterceptor } from 'src/common/interceptors/grpc-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // bufferLogs: true,
  });

  app.setGlobalPrefix('mario');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validateCustomDecorators: true,
    }),
  );

  app.useGlobalFilters(app.get(HttpExceptionFilter));
  app.useGlobalInterceptors(app.get(ResponseTransformerInterceptor));
  PpContextService.context = app;
  const config = new DocumentBuilder()
  .setTitle('mario')
  .setDescription('mario')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/mario/api', app, document);
  
  const port = app.get<ConfigService>(ConfigService).get('port') || 3000;
  app.enableCors({
    origin: '*', // Allow all origins (use specific origins in production for security)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });
  await app.listen(port);

  console.log(`App listening on port ${port}`);
}

async function bootstrapGrpc() {
  const grpcApp = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:30044',
      package: [
        // 'microservices.saarthi.v1.planner_goal',
        // 'microservices.saarthi.v1.saarthi',
      ],
      protoPath: glob.sync('src/proto/**/*.proto'),
      loader: {
        // includeDirs: [join(__dirname, '..', 'proto')],
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        arrays: true,
      },
    },
  });
  grpcApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validateCustomDecorators: true,
    }),
  );
  grpcApp.useGlobalFilters(grpcApp.get(GrpcExceptionFilter));
  grpcApp.useGlobalInterceptors(grpcApp.get(GrpcResponseInterceptor));
  await grpcApp.listen();
}

bootstrap();
// bootstrapGrpc();
