import { Module } from '@nestjs/common';
import { CredService } from './cred.service';
import { CredController } from './cred.controller';
import { RepositoryModule } from 'src/common/base-repository/base-repository.module';
import { Cred, CredSchema } from './schema/cred.schema';
import { MongoDBMarioConfig } from 'src/config/db.config.service';

@Module({
  imports: [
      RepositoryModule.forFeature(
        [
          {
            name: Cred.name,
            schema: CredSchema,
          },
        ],
        MongoDBMarioConfig.connectionName,
      ),
    ],
  controllers: [CredController],
  providers: [CredService],
  exports: [CredService],
})
export class CredModule {}
