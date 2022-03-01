import { Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';
import { PpLogger } from './boostrap/logger.service';
import { Logger } from './common/decorators/logger.decorator';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello( @Logger() logger: PpLogger) {
    // logger.log()
    // throw new UnauthorizedException('hdjhfkjdhfjkh');
    return this.appService.getHello(logger);
  }
}
