import { Injectable } from '@nestjs/common';
import { Document } from 'src/common/base-repository/types/document.interface';
import { IdDetailUrls } from 'src/common/internal-api/internal-api.urls';
import { Types } from 'mongoose';
import { deleteCache, DeleteKey } from 'src/common/decorators/cache.decorator';

@Injectable()
export class CacheMapper {
  INTERNAL = 'INTERNAL'; //hKey for internal apis

  SAARTHI = 'SAARTHI'; //should be same as uppercase modelNames

  STATIC = 'STATIC'; //hKey for static apis

  TTL_PREFIX = 'SAARTHI_TTL_PREFIX'; //cache keys which are using ttl to expire must start with this prefix (helps in deleting keys with matching prefix)

  //////////////Internal Api/////////////////////////////
  internalApiIdDetailKey(
    idName: keyof typeof IdDetailUrls,
    id: string,
    useTtl = false,
  ) {
    if (useTtl) return `${this.TTL_PREFIX}_${idName.toUpperCase()}_${id}`;
    else return `${idName.toUpperCase()}_${id}`;
  }
  getVideoDetailKey(
    orgId: Types.ObjectId,
    type: 'youtube' | 'vimeo' | 'penpencilvdo',
    url: string,
  ) {
    return `ORGANIZATION_${orgId.toString()}_TYPE_${type.toUpperCase()}_URL_${url}`;
  }

  //////////////Base Repository/////////////////////////
  baseRepoHkey(modelName: string) {
    return `${modelName.toUpperCase()}`;
  }
  baseRepoIdKey(id: Types.ObjectId) {
    return `${id.toString()}`;
  }

  baseRepoMappingLkey(
    modelName: string,
    orgId?: Types.ObjectId,
    id?: Types.ObjectId,
  ) {
    if (orgId) {
      if (id) {
        return `${modelName.toUpperCase()}_MAPPING_ORGANIZATION_${orgId.toString()}_ID_${id.toString()}`; //for perticular id
      } else {
        return `${modelName.toUpperCase()}_MAPPING_ORGANIZATION_${orgId.toString()}`; //for listing and aggregates,etc
      }
    } else {
      if (id) {
        return `${modelName.toUpperCase()}_MAPPING_ID_${id.toString()}`;
      } else {
        return `${modelName.toUpperCase()}_MAPPING`;
      }
    }
  }

  baseRepoMappingVal(hkey: string, key: string) {
    return `${hkey}-SEPERATOR-${key}`;
  }

  baseRepoMappingKeys(val: string) {
    const [hKey, key] = val.split('-SEPERATOR-');
    return { hKey: hKey.slice(1), key: key.slice(0, -1) };
  }

  //this method will be called when document is updated or created
  onDocumentUpdate(modelName: string, doc: any, mode: 'create' | 'update') {
    modelName = modelName.toUpperCase();
    const keys: DeleteKey[] = [];

    if (mode == 'update') {
      keys.push(
        { hKey: modelName, key: this.baseRepoIdKey(doc._id) }, //used when params.useCache=true
      );
    }
    deleteCache((mapper) => keys);
  }

  /////////////Modules/////////////////////////
}
