/**Agrigate options for Schema defnition*/
import { ProjectionFields } from 'mongoose';
import { Document } from './document.interface';
export interface SearchOptions<T> {
  page?: number;
  skip?: number;
  limit?: number;
  isLean?: boolean;
  project?: ProjectionFields<Document<T>>;
  populate?: any;
  sort?: any;
}
