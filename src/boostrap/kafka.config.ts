import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientsModuleOptionsFactory,
  KafkaOptions,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class KafkaConfigService implements ClientsModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createClientOptions(): KafkaOptions | Promise<KafkaOptions> {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.configService.get<string>('kafka.client'),
          brokers: this.configService.get<string>('kafka.brokers').split(' '),
        },
        consumer: {
          groupId: this.configService.get<string>('kafka.groupId'),
        },
        subscribe: {
          fromBeginning: true,
        },
      },
    };
  }
}
