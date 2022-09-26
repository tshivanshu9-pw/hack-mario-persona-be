/**Agrigate options for Schema defnition*/
import { ProjectionFields } from 'mongoose';
import { CacheMapper } from 'src/common/cache/cache.mapper';
import { Document } from './document.interface';
import { Params } from './params.interface';
export interface SearchOptions<T> {
  page?: number;
  skip?: number;
  limit?: number;
  isLean?: boolean;
  project?: ProjectionFields<Document<T>>;
  populate?: any;
  sort?: any;
  useCache?:
    | boolean
    | ((
        mapper: CacheMapper,
        params: Params<T>,
      ) => {
        key: string;
        hKey?: string;
        useMapping?: boolean;
      });
}
