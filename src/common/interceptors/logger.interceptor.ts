import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PpLogger } from 'src/boostrap/logger.service';
import logsConfig from 'src/boostrap/logs.config';
import { PpContextService } from 'src/core/services/context.service';

@Injectable()
export class PpLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const className = context.getClass().name;
    const loggingService = PpContextService.context.get(PpLogger);
    const request = context.switchToHttp().getRequest();
    loggingService.setLogLevels(logsConfig());
    loggingService.setContext(className);
    request['logger'] = loggingService;

    loggingService.log(`init ${className}`);

    const now = Date.now();
    return next.handle().pipe(
      tap((data) =>
        loggingService.log(
          `Data: ${data} | { Path: ${request.path} , Method: ${request.method}}`,
        ),
      ),
      catchError((err) => {
        loggingService.error(
          `Error From: ${className}: ${err} | { Path: ${request.path} | Method: ${request.method} }`,
        );
        throw err;
      }),
    );
  }
}
