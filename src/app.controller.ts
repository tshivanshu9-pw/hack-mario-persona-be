import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomLogger } from './common/decorators/logger.decorator';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/healthcheck')
  getHello(@CustomLogger() logger): string {
    return this.appService.getHello(logger);
  }
}
