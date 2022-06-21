import { Injectable } from '@nestjs/common';
import { PpLogger } from './boostrap/logger.service';
@Injectable()
export class AppService {
  getHello(logger: PpLogger): string {
    return 'Server is Running';
  }
}
