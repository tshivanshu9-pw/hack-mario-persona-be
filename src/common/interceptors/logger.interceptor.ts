import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { catchError, tap } from 'rxjs/operators';
import { PpLoggerService } from 'src/boostrap/logger.service';
import logsConfig from 'src/config/logs.config';
import { PpContextService } from 'src/core/services/context.service';
@Injectable()
export class PpLoggingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const className = context.getClass().name;
    const loggingService = await PpContextService.context.resolve(
      PpLoggerService,
    );
    loggingService.setLogLevels(logsConfig());
    loggingService.setContext(className);
    loggingService.log(`init ${className}`);
    request['logger'] = loggingService;

    return next.handle().pipe(
      tap((data) =>
        loggingService.log(
          `Data: ${JSON.stringify(data)} | { Path: ${request.path} , Method: ${
            request.method
          }}`,
        ),
      ),
      catchError((err) => {
        loggingService.error(
          `Error From: ${className}: ${JSON.stringify(err)} | { Path: ${
            request.path
          } | Method: ${request.method} }`,
        );
        throw err;
      }),
    );
  }
}
