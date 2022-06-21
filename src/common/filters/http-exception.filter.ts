import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException && exception.getStatus()
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let messages =
      exception instanceof HttpException && exception.getResponse()
        ? (exception.getResponse() as any)?.message
        : status == 500
        ? [] //[exception]
        : 'Internal Server Error';

    const responseBody = {
      statusCode: status,
      message: Array.isArray(messages) ? messages[0] : messages,
      fieldErrors: Array.isArray(messages) ? messages : [messages],
      error: true,
    };

    response.status(status).json(responseBody);
  }
}
