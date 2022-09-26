import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { captureError, startSpan } from '../decorators/apm.decorator';
import { PpLoggerService } from '../logger/logger.service';

@Injectable()
export class GrpcResponseInterceptor implements NestInterceptor {
  constructor(private logger: PpLoggerService) {
    this.logger.setContext(GrpcResponseInterceptor.name);
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const span = startSpan('GrpcResponseInterceptor');
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;

    const now = performance.now();
    return next.handle().pipe(
      map((data) => {
        const responseData = {
          data,
        };
        if (data?.paginate) {
          responseData.data = data.data;
          responseData['paginate'] = data.paginate;
        }
        this.logger.log(
          `Response: ${JSON.stringify(
            responseData,
          )}, \ngrpc-method: ${className}.${handlerName}, \nProcessTime: ${(
            performance.now() - now
          ).toFixed(4)} ms`,
        );
        span?.end();
        return responseData;
      }),
      catchError((err) => {
        this.logger.error(
          `Error From grpc-method ${className}.${handlerName}: ${JSON.stringify(
            err,
          )}`,
        );
        captureError(err);
        throw err;
      }),
    );
  }
}
