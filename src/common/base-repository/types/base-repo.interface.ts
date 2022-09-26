import { PipelineStage } from 'mongoose';
import { FilterQuery, Model, UpdateQuery, QueryOptions, Types } from 'mongoose';
import { Document } from './document.interface';
import { Params } from './params.interface';

/**Interface for BaseRepository */
export interface BaseRepository<T> {
  model: Model<T>;
  /**returns document count for filterQuery */
  count(searchParams: FilterQuery<T>): Promise<number>;

  /**returns single document for a given query*/
  fetchOne(params: Params<T>): Promise<Document<T>>;

  /**returns all documents for a given query */
  list(params: Params<T>): Promise<Array<Document<T>>>;

  /**creates a single document in db*/
  create(data: T): Promise<Document<T>>;

  /**creates document list in db */
  createMany(dataList: T[]); //todo

  /**finds one and update the document*/
  findOneAndUpdate(
    searchParams: FilterQuery<T>,
    data: UpdateQuery<Document<T>>,
    options?: QueryOptions,
  ): Promise<Document<T>>;

  /**finds and update all matching document*/
  updateMany(
    searchParams: FilterQuery<T>,
    data: UpdateQuery<Document<T>>,
    options?: QueryOptions,
  ); //todo return type

  /**deletes one matching document */
  deleteOne(searchParams: FilterQuery<T>); //todo return type

  /**deletes all matching document */
  deleteMany(searchParams: FilterQuery<T>); //todo return type

  /**performs aggregation on collection */
  aggregate(pipeline: PipelineStage[]): Promise<any>;

  /**
   * push cache keys to cachemapping(list)
   * if "id" is provided this key will delete only when doc with that "id" updated
   * otherwise this key will delete when any doc related to this model is updated or created
   */
  pushToCacheMapping(
    hKey: string,
    key: string,
    orgId?: Types.ObjectId,
    id?: Types.ObjectId,
  ): void;

  /**
   * delete all cache related to given document
   * this is called when create and findOneAndUpdate is called
   */
  deleteDocCache(doc: Document<T>, mode: 'create' | 'update'): void;

  /**
   * delete all cache related to this model
   */
  deleteAllCache(): void;

  /**
   * delete cache mapping
   * this is called when create and findOneAndUpdate is called
   */
  deleteCacheMapping(orgId?: Types.ObjectId, id?: Types.ObjectId): void;

  /**calls logger instance from repository*/
  log(data: any): void;
}
