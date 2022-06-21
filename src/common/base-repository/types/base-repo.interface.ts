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

  /**calls logger instance from repository*/
  log(data: any): void;
}
