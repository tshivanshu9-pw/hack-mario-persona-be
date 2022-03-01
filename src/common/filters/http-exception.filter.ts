import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let messages =
      exception instanceof HttpException
        ? (exception.getResponse() as any)?.message
        : status == 500
        ? []
        : 'Internal Server Error';

    const responseBody = {
      status_code: status,
      data: null,
      message: Array.isArray(messages) ? messages[0] : messages,
      field_errors: Array.isArray(messages) ? messages : [messages],
      error: true,
    };

    response.status(status).json(responseBody);
  }
}
