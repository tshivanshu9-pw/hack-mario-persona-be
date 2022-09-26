import { HttpException, Inject, Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/base-repository/types/base-repo.interface';
import { ApmSpanAllMethods } from 'src/common/decorators/apm.decorator';
import {
  HeaderOrganizationDto,
  HeaderUserOrganizationDto,
} from 'src/common/dto/headers.dto';
import { PageLimitDto } from 'src/common/dto/pagination.dto';
import { PpLoggerService } from 'src/common/logger/logger.service';
import { SaarthiDto, SaarthiIdParam } from './dto/saarthi.dto';
import { SaarthiMapper } from './mappers/saarthi.mapper';
import { Saarthi } from './schema/saarthi.schema';
import { FilterQuery } from 'mongoose';
import { Document } from 'src/common/base-repository/types/document.interface';
import { SaarthiStatusEnum } from './saarthi.enum';
import { InternalApiService } from 'src/common/internal-api/internal-api.service';
import { VideoService } from 'src/common/internal-api/video.service';
import { InternalApiVideoDetailParams } from 'src/common/internal-api/types';

@ApmSpanAllMethods()
@Injectable()
export class SaarthiService {
  constructor(
    @Inject(Saarthi.name)
    private saarthiRepo: BaseRepository<Saarthi>,
    private saarthiMapper: SaarthiMapper,
    private internalApiService: InternalApiService,
    private videoService: VideoService,
    private logger: PpLoggerService,
  ) {
    this.logger.setContext(SaarthiService.name);
  }

  async createSaarthi(headers: HeaderUserOrganizationDto, body: SaarthiDto) {
    this.logger.verbose('Creating New Saarthi Document');
    const data = this.saarthiMapper.mapToCreateData(headers, body);
    return this.saarthiRepo.create(data);
  }

  async listSaarthi(headers: HeaderOrganizationDto, query: PageLimitDto) {
    this.logger.verbose('Listing Saarthi Documents');
    //index: organization_id, status, page or skip, limit, sort
    const params = this.saarthiMapper.mapToListParams(headers, query);
    const [docs, totalCount] = await Promise.all([
      this.saarthiRepo.list(params),
      this.saarthiRepo.count(params.searchParams),
    ]);
    const populatedDocs = await this.internalApiService.populateDocs(docs, [
      {
        path: 'label_1.image_id',
        model: 'fileId',
        select: ['name', 'key', 'baseUrl', '_id'],
        replace: {
          baseUrl: 'base_url',
        },
      },
      {
        path: 'label_2.image_id',
        model: 'fileId',
        select: ['name', 'key', 'baseUrl', '_id'],
        replace: {
          baseUrl: 'base_url',
        },
      },
      {
        path: 'mentors_metadata.image_id',
        model: 'fileId',
        select: ['name', 'key', 'baseUrl', '_id'],
        replace: {
          baseUrl: 'base_url',
        },
      },
      async (doc) => {
        if (['penpencilvdo', 'youtube', 'vimeo'].includes(doc.video_type)) {
          const videoDetailParams: InternalApiVideoDetailParams = {
            videoType: doc.video_type as 'youtube' | 'vimeo' | 'penpencilvdo',
            videoUrl: doc.video_url,
            organizationId: headers.organization_id.toString(),
          };
          doc['video_details'] = await this.videoService.getVideoDetail(
            videoDetailParams,
          );
          delete doc.video_url;
        }
        return doc;
      },
    ]);

    return { data: docs, totalCount };
  }

  async updateSaarthi(
    headers: HeaderOrganizationDto,
    params: SaarthiIdParam,
    body: SaarthiDto,
  ) {
    this.logger.verbose('Updating Saarthi Document');
    const searchParams: FilterQuery<Document<Saarthi>> = {
      _id: params.saarthi_id, //todo check for status
    };
    const data = {
      ...body,
      // slug: this.slugService.createSlug(body.title),
    };
    const doc = await this.saarthiRepo.findOneAndUpdate(searchParams, data);
    if (!doc) throw new HttpException('Saarthi Not Found', 400);
    return;
  }

  async inactivateSaarthi(
    headers: HeaderOrganizationDto,
    params: SaarthiIdParam,
  ) {
    this.logger.verbose('Deleting Saarthi Document');
    const searchParams: FilterQuery<Document<Saarthi>> = {
      _id: params.saarthi_id,
    };
    const data = { status: SaarthiStatusEnum.Inactive };
    const doc = await this.saarthiRepo.findOneAndUpdate(searchParams, data);
    if (!doc) throw new HttpException('Saarthi Not Found', 400);
    return;
  }
}
