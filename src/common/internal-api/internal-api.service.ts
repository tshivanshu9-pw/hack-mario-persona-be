import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IdDetailUrls } from './internal-api.urls';
import { Types } from 'mongoose';
import {
  InternalApiIdDetailParams,
  InternalApiIdDetailsParams,
  InternalApiPopulate,
} from './types/index';
import { UseCache } from '../decorators/cache.decorator';
import { PpLoggerService } from 'src/common/logger/logger.service';
import { ApmSpanAllMethods } from '../decorators/apm.decorator';
import { HttpUtilService } from '../utils/http-util.service';

@ApmSpanAllMethods()
@Injectable()
export class InternalApiService {
  private readonly BASE_URL = '';

  constructor(
    private configService: ConfigService,
    private httpUtilService: HttpUtilService,
    private logger: PpLoggerService,
  ) {
    this.logger.setContext(InternalApiService.name);
    this.BASE_URL = this.configService.get('INTERNAL_BASE_URL');
    this.logger.log('INTERNAL_BASE_URL', this.BASE_URL);
  }

  @UseCache((mapper, searchParams: InternalApiIdDetailParams) => {
    const { id, idName, useCache = true } = searchParams;

    if (useCache && idName == 'fileId') {
      return {
        hKey: mapper.INTERNAL,
        key: mapper.internalApiIdDetailKey(idName, id.toString()),
      };
    }
    if (useCache && idName == 'userId') {
      return {
        key: mapper.internalApiIdDetailKey(idName, id.toString(), true),
        ttl: 15 * 60,
      };
    }
  })
  async getIdDetail(searchParams: InternalApiIdDetailParams) {
    const { idName, id } = searchParams;
    try {
      if (!(idName in IdDetailUrls)) {
        this.logger.error('internal-api url not found ' + idName);
        throw 'internal-api url not found ' + idName;
      }
      if (!Types.ObjectId.isValid(id)) {
        this.logger.error('invalid ' + idName + ': ' + id);
        throw 'invalid ' + idName + ': ' + id;
      }
      const url = this.BASE_URL + IdDetailUrls[idName];
      const body = { ids: [id] };
      const data: any = await this.httpUtilService.post(url, body, {});
      return data && Array.isArray(data) ? data[0] : null;
    } catch (error) {
      this.logger.error(
        'getIdDetail: ',
        'arguments: ',
        JSON.stringify(arguments),
        'Error: ',
        JSON.stringify(error),
      );
      throw error;
    }
  }

  async getIdDetails(searchParams: InternalApiIdDetailsParams) {
    const { idName, ids } = searchParams;
    try {
      if (!(idName in IdDetailUrls)) {
        this.logger.error('internal-api url not found ' + idName);
        throw 'internal-api url not found ' + idName;
      }
      const validLength = ids.map((id) => Types.ObjectId.isValid(id)).length;
      if (validLength != ids.length) {
        this.logger.error('invalid ' + idName + 's: ' + ids);
        throw 'invalid ' + idName + 's: ' + ids;
      }
      const url = this.BASE_URL + IdDetailUrls[idName];
      const body = { ids };
      const data: any = await this.httpUtilService.post(url, body, {});
      return data && Array.isArray(data) ? data : [];
    } catch (error) {
      this.logger.error(
        'getIdDetails: ',
        'arguments: ',
        JSON.stringify(arguments),
        'Error: ',
        JSON.stringify(error),
      );
      throw error;
    }
  }

  async populateDoc<T = any>(doc: T, populate: InternalApiPopulate<T>[]) {
    if (!doc || !Array.isArray(populate)) return doc;
    await Promise.all(
      populate.map(async (singlePopulate) => {
        if (typeof singlePopulate == 'function') {
          doc = await singlePopulate(doc);
          return doc;
        }
        const { path: p, model, populate, ...options } = singlePopulate;
        const paths = String(p).split('.');
        const mainPath = paths[0];
        const subPath = paths[1];
        if (!doc[mainPath]) return; // populate only if path exists

        if (subPath) {
          //deep populate docs in array
          if (Array.isArray(doc[mainPath])) {
            doc[mainPath] = await Promise.all(
              doc[mainPath].map(async (currDoc) => {
                if (!currDoc[subPath]) return currDoc; //deep populate only if path and id exists
                let detail: any;
                if (typeof model == 'function') {
                  detail = await model(currDoc); //detail function
                } else {
                  detail = await this.getIdDetail({
                    idName: model,
                    id: currDoc[subPath],
                  });
                }
                currDoc = this.modifyField(currDoc, subPath, detail, options);
                return currDoc;
              }),
            );
          } else {
            // deep populate current doc
            let currDoc = doc[mainPath];
            let detail: any;
            if (typeof model == 'function') {
              detail = await model(currDoc);
            } else {
              detail = await this.getIdDetail({
                idName: model,
                id: currDoc[subPath],
              });
            }
            currDoc = this.modifyField(currDoc, subPath, detail, options);
            doc[mainPath] = currDoc;
          }
        } else {
          //populate main doc
          let detail: any;
          if (typeof model == 'function') {
            detail = await model(doc);
          } else {
            detail = await this.getIdDetail({
              idName: model,
              id: doc[mainPath],
            });
            doc = this.modifyField(doc, mainPath, detail, options);
          }
        }

        //check for nested populate(recursion)
        //base condition
        if (!(populate && doc[mainPath] && typeof doc[mainPath] != 'string')) {
          return;
        }
        if (subPath) {
          //doc[mainPath][subpath] will be doc
          if (!doc[mainPath][subPath]) return;
          doc[mainPath][subPath] = await this.populateDoc(
            doc[mainPath][subPath],
            populate,
          );
        } else {
          //doc[mainPath] will be doc
          doc[mainPath] = await this.populateDoc(doc[mainPath], populate);
        }
      }),
    );
    type ModifiedDoc = { [p in keyof T]: any }; //todo
    return <ModifiedDoc>doc;
  }
  async populateDocs<T = any>(doc: T[], populate: InternalApiPopulate<T>[]) {
    if (!doc || !Array.isArray(populate)) return doc;
    doc = await Promise.all(doc.map((d) => this.populateDoc<T>(d, populate)));
    return <{ [p in keyof T]: any }[]>doc;
  }
  private modifyField(
    doc: any,
    path: string,
    detail: any,
    options: {
      select?: string[];
      drop?: string[];
      replace?: Record<string, string>;
    },
  ) {
    const { select, drop, replace } = options;
    if (!doc[path]) return doc;
    if (!detail) {
      doc[path] = null;
      return doc;
    }
    if (drop && Array.isArray(drop)) {
      doc[path] = detail;
      drop.forEach((s) => delete doc[path][s]);
    } else if (select && Array.isArray(select)) {
      //select is prefered over drop
      doc[path] = {}; //todo:return null
      select.forEach((s) => (doc[path][s] = detail[s]));
    } else {
      doc[path] = detail;
    }
    //replace={oldFiled:newField}
    if (replace && typeof replace != 'string') {
      for (let key in replace) {
        const value = doc[path][key];
        delete doc[path][key]; //delete old key
        doc[path][replace[key]] = value; //add new key with old value
      }
    }
    return doc;
  }
}
