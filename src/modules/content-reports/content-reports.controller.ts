import { Controller, Get, Query } from '@nestjs/common';
import { ContentReportsService } from './content-reports.service';

@Controller('content-reports')
export class ContentReportsController {
  constructor(private readonly contentReportsService: ContentReportsService) {}

  @Get('trends')
  async getTrends(@Query('days') days: string) {
    const numDays = days ? parseInt(days, 10) : 7;
    return await this.contentReportsService.getGenerationTrends(numDays);
  }

  @Get('total')
  async getTotal() {
    return { total: await this.contentReportsService.getTotalGeneratedContents() };
  }
}
