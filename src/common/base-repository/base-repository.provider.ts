import {
  FilterQuery,
  Model,
  PipelineStage,
  UpdateQuery,
  QueryOptions,
  Types,
} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Logger, Provider } from '@nestjs/common';
import { BaseRepository } from './types/base-repo.interface';
import { Document } from './types/document.interface';
import { Params } from './types/params.interface';
import { CacheService } from '../cache/cache.service';
import { PpLoggerService } from 'src/common/logger/logger.service';
import { CacheMapper } from '../cache/cache.mapper';
import { ApmSpan } from '../decorators/apm.decorator';

const defaultParams = {
  isLean: true,
};

/**Repository provider for given schema name*/
function getProvider(name: string): Provider {
  class Repository<T> implements BaseRepository<T> {
    constructor(
      @InjectModel(name)
      public model: Model<Document<T>>,
      private cacheService: CacheService,
      private cacheMapper: CacheMapper,
      private logger: PpLoggerService,
    ) {
      this.logger.setContext(`BaseRepository-${this.model.modelName}`);
    }

    log(data: any) {
      this.logger.log(data);
    }

    @ApmSpan()
    async count(searchParams: FilterQuery<Document<T>>) {
      try {
        const count = await this.model.count(searchParams);
        return count;
      } catch (err) {
        this.logger.error(err);
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @ApmSpan()
    async fetchOne(params: Params<T>) {
      try {
        params = { ...defaultParams, ...params };
        const cacheKey = this.getFetchOneCacheKey(params);
        if (cacheKey) return this.fetchOneFromCache(params, cacheKey);

        const entity = this.generateSearchQueryForFetchOne(params);
        const doc = await entity.exec();
        return doc;
      } catch (err) {
        this.logger.error(err);
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @ApmSpan()
    async list(params: Params<T>) {
      try {
        params = { ...defaultParams, ...params };
        const entity = this.generateSearchQueryForFetch(params);
        const docs = await entity.exec();
        return docs || [];
      } catch (err) {
        this.logger.error(err);
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @ApmSpan()
    async create(data: T) {
      try {
        const entity = new this.model(data);
        const doc = await entity.save();

        if (doc) this.deleteDocCache(doc, 'create');

        return doc;
      } catch (error) {
        this.logger.error(error);
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @ApmSpan()
    async createMany(dataList: T[]) {
      try {
        const result = await this.model.insertMany(dataList);
        return result;
      } catch (error) {
        this.logger.error(error);
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @ApmSpan()
    async findOneAndUpdate(
      searchParams: FilterQuery<Document<T>>,
      data: UpdateQuery<Document<T>>,
      options?: QueryOptions,
    ) {
      try {
        const doc = await this.model.findOneAndUpdate(searchParams, data, {
          new: true,
          ...options,
        }); //returns new document

        if (doc) this.deleteDocCache(doc, 'update');

        return doc;
      } catch (error) {
        this.logger.error(error);
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @ApmSpan()
    async updateMany(
      searchParams: FilterQuery<Document<T>>,
      data: UpdateQuery<Document<T>>,
      options: QueryOptions = {},
    ) {
      try {
        const result = await this.model.updateMany(searchParams, data, options);
        return result;
      } catch (error) {
        this.logger.error(error);
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @ApmSpan()
    async deleteOne(searchParams: FilterQuery<Document<T>>) {
      try {
        const result = await this.model.deleteOne(searchParams);
        return result;
      } catch (error) {
        this.logger.error(error);
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @ApmSpan()
    async deleteMany(searchParams: FilterQuery<Document<T>>) {
      try {
        const result = await this.model.deleteMany(searchParams);
        return result;
      } catch (error) {
        this.logger.error(error);
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    private generateSearchQueryForFetchOne(params: Params<T>) {
      let entity = this.model.findOne(params.searchParams || {});

      if (params.project) {
        entity = this.model.findOne(
          params.searchParams || {},
          params.project || {},
        );
      }
      if (params.populate) {
        entity.populate(params.populate);
      }
      // if (params.deepPopulate) {
      //   entity.deepPopulate(params.deepPopulate);
      // }
      if (params.sort) {
        entity.sort(params.sort);
      }
      if (params.isLean) {
        entity.lean();
      }
      return entity;
    }

    private generateSearchQueryForFetch(params: Params<T>) {
      let entity = this.model.find(params.searchParams || {});

      if (params.project) {
        entity = this.model.find(
          params.searchParams || {},
          params.project || {},
        );
      }
      if (params.populate) {
        entity.populate(params.populate);
      }
      // if (params.deepPopulate) {
      //   entity.deepPopulate(params.deepPopulate);
      // }
      if (params.sort) {
        entity.sort(params.sort);
      }

      const page = params.page;
      const limit = params.limit;
      if (page && limit && page > 0) {
        params.skip = (page - 1) * limit;
      }

      if (params.skip) {
        entity.skip(params.skip);
      }
      if (params.limit) {
        entity.limit(params.limit);
      }
      if (params.isLean) {
        entity.lean();
      }
      return entity;
    }

    @ApmSpan()
    async aggregate(pipeline: PipelineStage[]) {
      try {
        const result = await this.model.aggregate(pipeline);
        return result;
      } catch (error) {
        this.logger.error(error);
        throw error;
      }
    }

    //////////////////CACHING///////////////////
    private getFetchOneCacheKey(params: Params<T>) {
      if (!(params.useCache && !params.populate && params.isLean)) return null;

      //get cache keys from function
      if (typeof params.useCache == 'function') {
        const cacheConfig = params.useCache(this.cacheMapper, params);
        if (!cacheConfig) return null;
        return {
          key: cacheConfig.key,
          hKey:
            cacheConfig.hKey ||
            this.cacheMapper.baseRepoHkey(this.model.modelName), //default hKey
          useMapping: cacheConfig.useMapping,
        };
      }

      //use default cache keys
      if (params.searchParams._id) {
        return {
          hKey: this.cacheMapper.baseRepoHkey(this.model.modelName),
          key: this.cacheMapper.baseRepoIdKey(params.searchParams._id),
          useMapping: false,
        };
      }

      return null;
    }
    private async fetchOneFromCache(
      params: Params<T>,
      cacheKey: {
        hKey: string;
        key: string;
        useMapping: boolean;
      },
    ) {
      let doc: Document<T> | Partial<Document<T>>;
      const { hKey, key, useMapping } = cacheKey;

      doc = await this.cacheService.hGet(hKey, key);
      if (!doc) {
        const entity = this.model.findOne(params.searchParams || {});
        entity.lean();
        if (params.sort) entity.sort(params.sort);
        doc = await entity.exec();
        if (doc) {
          this.cacheService.hSet(hKey, key, doc);
          //map this hKey and key to id for deleting
          if (useMapping)
            this.pushToCacheMapping(
              hKey,
              key,
              (doc as any).organization_id,
              !params.sort ? doc._id : null, //if search params has sort cache key has to delete for all updates
            );
        }
      }

      if (doc && params.project) {
        //todo:clarify, right now assumimg all fields in project either 0 or 1
        let isSelect = true;
        for (let key in params.project) {
          if (!params.project[key]) {
            isSelect = false;
            break;
          }
        }

        const projectField = (doc: object, levels: string[]) => {
          const key = levels[0];
          if (!(doc && key in doc)) return doc; //throw
          //select field at every level
          if (isSelect) doc = { [key]: doc[key] };
          if (levels.length == 1) {
            //delete field only at last level
            if (!isSelect) delete doc[key];
            return doc;
          }

          //project levels till field level
          if (Array.isArray(doc[key])) {
            doc[key] = doc[key].map((subDoc) => {
              return projectField(subDoc, levels.slice(1));
            });
          } else {
            doc[key] = projectField(doc[key], levels.slice(1));
          }
          return doc;
        };

        let projectedDoc = {};
        for (let path in params.project) {
          path = path.trim();
          const levels = path.split('.').map((k) => k?.trim());
          if (isSelect) {
            const [key, value] = Object.entries(projectField(doc, levels))[0];
            projectedDoc[key] = value;
          } else {
            projectedDoc = projectField(doc, levels);
          }
        }
        doc = projectedDoc;
      }

      // if(doc&& params.populate){
      //  possible to implement
      // }

      return doc as Document<T>;
    }

    async pushToCacheMapping(
      hKey: string,
      key: string,
      orgId?: Types.ObjectId,
      id?: Types.ObjectId,
    ) {
      if (!(hKey && key)) return;
      const mappingLkey = this.cacheMapper.baseRepoMappingLkey(
        this.model.modelName,
        orgId,
        id,
      );
      const mappingval = this.cacheMapper.baseRepoMappingVal(hKey, key);
      this.cacheService.lPush(mappingLkey, mappingval);
    }
    //this method is called every update and create
    async deleteDocCache(doc: Document<T>, mode: 'create' | 'update') {
      this.cacheMapper.onDocumentUpdate(this.model.modelName, doc, mode);

      if (mode == 'create')
        this.deleteCacheMapping((doc as any).organization_id);
      if (mode == 'update')
        this.deleteCacheMapping((doc as any).organization_id, doc._id);
    }

    async deleteAllCache() {
      const hKey = this.cacheMapper.baseRepoHkey(this.model.modelName);
      this.cacheService.del(hKey);
      //now cache mapping list contain deleted cache keys,so no need to delete mapping list(will delete after 24 hrs)
    }

    async deleteCacheMapping(orgId?: Types.ObjectId, id?: Types.ObjectId) {
      const mappingKeys = [];
      if (id) {
        //delete both id mapping and static mapping(without id)
        mappingKeys.push(
          this.cacheMapper.baseRepoMappingLkey(this.model.modelName, orgId, id),
          this.cacheMapper.baseRepoMappingLkey(this.model.modelName, orgId),
        );
      } else {
        //delete only static mapping
        mappingKeys.push(
          this.cacheMapper.baseRepoMappingLkey(this.model.modelName, orgId),
        );
      }
      mappingKeys.map(async (mappingKey) => {
        const mappings = await this.cacheService.lRange(mappingKey);
        //todo:loop and distributed locking,
        mappings?.map((val) => {
          const { hKey, key } = this.cacheMapper.baseRepoMappingKeys(val);
          this.cacheService.hDel(hKey, key);
        });
        this.cacheService.del(mappingKey);
      });
    }
  }

  return {
    provide: name,
    useClass: Repository,
  };
}

/**Provides repository for given features*/
export function getProviders(features): Provider[] {
  return features.map(({ name }) => getProvider(name));
}
