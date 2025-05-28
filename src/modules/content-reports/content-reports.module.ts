import { Module } from '@nestjs/common';
import { ContentReportsService } from './content-reports.service';
import { ContentReportsController } from './content-reports.controller';
import { RepositoryModule } from 'src/common/base-repository/base-repository.module';
import { ContentReports, ContentReportsSchema } from './schema/content-reports.schema';
import { MongoDBMarioConfig } from 'src/config/db.config.service';

@Module({
  imports: [
    RepositoryModule.forFeature(
      [
        {
          name: ContentReports.name,
          schema: ContentReportsSchema,
        },
      ],
      MongoDBMarioConfig.connectionName,
    ),
  ],
  controllers: [ContentReportsController],
  providers: [ContentReportsService],
  exports: [ContentReportsService],
})
export class ContentReportsModule {}
