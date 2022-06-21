import { Injectable } from '@nestjs/common';
import { PpLogger } from './common/logger/logger.service';
@Injectable()
export class AppService {
  getHello(logger: PpLogger): string {
    return 'Server is Running';
  }
}
