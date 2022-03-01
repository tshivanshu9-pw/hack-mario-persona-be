import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

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
        return {
          status_code: response?.statusCode,
          data,
          message: '',
          field_errors: [],
          error: false,
        };
      }),
    );
  }
}
