import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { RepositoryModule } from 'src/common/base-repository/base-repository.module';
import { Content, ContentSchema } from './schema/contents.schema';
import { MongoDBMarioConfig } from 'src/config/db.config.service';
import { ContentReportsModule } from '../content-reports/content-reports.module';
import { InternalApiModule } from 'src/common/internal-api/internal-api.module';

@Module({
  imports: [
      RepositoryModule.forFeature(
        [
          {
            name: Content.name,
            schema: ContentSchema,
          },
        ],
        MongoDBMarioConfig.connectionName,
      ),
      ContentReportsModule,
      InternalApiModule,
    ],
  controllers: [ContentsController],
  providers: [ContentsService]
})
export class ContentsModule {}
