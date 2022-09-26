import { status } from '@grpc/grpc-js';
import {
  ArgumentsHost,
  Catch,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';

import { PpLoggerService } from 'src/common/logger/logger.service';
import { startSpan } from '../decorators/apm.decorator';

@Catch()
@Injectable()
export class GrpcExceptionFilter extends BaseRpcExceptionFilter {
  constructor(private logger: PpLoggerService) {
    super();
    this.logger.setContext(GrpcExceptionFilter.name);
  }

  catch(exception: any, host: ArgumentsHost) {
    const span = startSpan('GrpcExceptionFilter');
    if (exception instanceof RpcException) {
      return super.catch(exception, host);
    } else if (exception instanceof HttpException) {
      return super.catch(
        new RpcException({
          //@ts-ignore
          message: exception.getResponse()?.message || exception?.message,
          code: 11, //todo
        }),
        host,
      );
    } else if (exception?.isAxiosError) {
      return super.catch(
        new RpcException({
          message: exception.response?.statusText,
          code: 11, //todo
        }),
        host,
      );
    } else {
      this.logger.error(
        `Grpc Unhandled Error: ${JSON.stringify(
          exception,
          Object.getOwnPropertyNames(exception),
        )}`,
      );
      return super.catch(
        new RpcException({
          message: 'Internal Server Error',
          code: status.INTERNAL,
        }),
        host,
      );
    }
  }
}
