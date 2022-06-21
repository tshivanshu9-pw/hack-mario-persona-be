import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    if (
      ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].indexOf(request.method) === -1
    ) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        let responseData = {
          statusCode: response?.statusCode,
          data,
        };

        if (data?.paginate) {
          (responseData.data = data.data),
            (responseData['paginate'] = data.paginate);
        }

        return responseData;
      }),
    );
  }
}
