import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ContentReportsModule } from './modules/content-reports/content-reports.module';
import { ContentsModule } from './modules/contents/contents.module';

@Module({
  imports: [CoreModule, ContentReportsModule, ContentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
