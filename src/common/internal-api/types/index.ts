import { IdDetailUrls, VideoUrls } from '../internal-api.urls';

export type InternalApiIdDetailParams = {
  idName: keyof typeof IdDetailUrls;
  id: string;
  /**
   * default true
   */
  useCache?: boolean;
};

export type InternalApiIdDetailsParams = {
  idName: keyof typeof IdDetailUrls;
  ids: string[];
};

export type InternalApiVideoDetailParams = {
  videoType: keyof typeof VideoUrls;
  videoUrl: string;
  organizationId: string;
};

export type InternalApiPopulate<T> =
  | {
      path: keyof T | string;
      select?: string[];
      drop?: string[];
      replace?: Record<string, string>;
      model: keyof typeof IdDetailUrls | ((currDoc: any) => any); //function to fetch detail
      populate?: InternalApiPopulate<any>[];
    }
  | ((doc: T) => any); //whole populate can be document modifying function
