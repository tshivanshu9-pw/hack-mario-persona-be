import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageGateway } from './dummy-implementations/gateway/message.gateway';
// import { KafkaModule } from './dummy-implementations/kafka/kafka.module';
// import { ProducerService } from './dummy-implementations/kafka/producer.service';
// import { TestConsumer } from './dummy-implementations/kafka/test.consumer';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
