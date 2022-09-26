import { DynamicModule, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { getProviders } from './base-repository.provider';

/**module contains mongoose module and base repository providers*/
@Module({})
export class RepositoryModule {
  static forFeature(
    features: ModelDefinition[],
    connectionName: string,
  ): DynamicModule {
    return {
      module: RepositoryModule,
      imports: [MongooseModule.forFeature(features, connectionName)],
      providers: getProviders(features),
      exports: getProviders(features),
    };
  }
}
