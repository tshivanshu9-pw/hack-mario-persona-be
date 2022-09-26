import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';
import { PpLoggerService } from 'src/common/logger/logger.service';
import { startSpan } from '../decorators/apm.decorator';

@Catch()
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: PpLoggerService) {
    this.logger.setContext(HttpExceptionFilter.name);
  }

  catch(exception: any, host: ArgumentsHost) {
    const span = startSpan('HttpExceptionFilter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = null;
    let message = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.getResponse() as any;
      if (message instanceof Error) {
        message = message.message;
      }
    } else if (exception?.isAxiosError) {
      status = exception.response?.status;
      message = exception.response?.statusText;
    } else {
      status = 500;
      message = 'Internal Server Error';
      try {
        const request = ctx.getRequest();
        this.logger.error(
          `Unhandled Error: ${JSON.stringify(
            exception,
            Object.getOwnPropertyNames(exception),
          )} | Method: ${request.method} | Path: ${request.path}`,
        );
      } catch (error) {
        console.log('Unhandled Error Catch is not working', error);
      }
    }

    const responseBody = {
      statusCode: status,
      message: Array.isArray(message) ? message[0] : message,
      fieldErrors: Array.isArray(message) ? message : [message],
      error: true,
    };

    response.status(status).json(responseBody);
    span?.end();
  }
}
