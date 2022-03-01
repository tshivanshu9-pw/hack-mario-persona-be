import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { PpLogger } from './boostrap/logger.service';
import { service_name } from './common/constants';
// import { ProducerService } from './dummy-implementations/kafka/producer.service';

@Injectable()
export class AppService {
  async getHello(logger: PpLogger) {
    logger.setContext('AppService');
    logger.log('This is the log kjfdsklajfklaj');
    return 'Hello World';
  }
}
