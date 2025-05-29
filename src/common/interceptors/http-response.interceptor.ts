import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { catchError, map } from 'rxjs/operators';
import { captureError, startSpan } from '../decorators/apm.decorator';
import { PpLoggerService } from '../logger/logger.service';

@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor {
  constructor(private logger: PpLoggerService) {
    this.logger.setContext(ResponseTransformerInterceptor.name);
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const span = startSpan('ResponseTransformerInterceptor');
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;

    const now = performance.now();
    return next.handle().pipe(
      map((data) => {
        const responseData = {
          statusCode: response?.statusCode, //todo: use snake_case
          data,
        };
        if (data?.paginate) {
          responseData.data = data.data;
          responseData['paginate'] = data.paginate;
        }
        // this.logger.log(
        //   `Response: ${JSON.stringify(responseData)}, \nPath: ${
        //     request.path
        //   }, \nMethod: ${request.method}}, \nProcessTime: ${(
        //     performance.now() - now
        //   ).toFixed(4)} ms`,
        // );
        span?.end();
        return responseData;
      }),
      catchError((err) => {
        this.logger.error(
          `Error From: ${className}: ${JSON.stringify(err)} | { Path: ${
            request.path
          } | Method: ${
            request.method
          } } HandlerName:${className}.${handlerName}`,
        );
        captureError(err);
        throw err;
      }),
    );
  }
}
