import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/common/base-repository/base-repository.module';
import { InternalApiModule } from 'src/common/internal-api/internal-api.module';
import { SlugService } from 'src/common/utils/slug.service';
import { MongoDBSaarthiConfig } from 'src/config/db.config.service';
import { SaarthiMapper } from './mappers/saarthi.mapper';
import { SaarthiAdminController } from './saarthi.admin.controller';
import { SaarthiService } from './saarthi.service';
import { Saarthi, SaarthiSchema } from './schema/saarthi.schema';

@Module({
  imports: [
    RepositoryModule.forFeature(
      [
        {
          name: Saarthi.name,
          schema: SaarthiSchema,
        },
      ],
      MongoDBSaarthiConfig.connectionName,
    ),

    InternalApiModule,
  ],
  providers: [SaarthiService, SaarthiMapper, SlugService],
  exports: [SaarthiService],
})
export class SaarthiModuleCommon {}

// @Module({
//   imports: [SaarthiModuleCommon],
//   controllers: [SaarthiUserController],
// })
// export class SaarthiModuleUser {}

@Module({
  imports: [SaarthiModuleCommon],
  controllers: [SaarthiAdminController],
})
export class SaarthiModuleAdmin {}
