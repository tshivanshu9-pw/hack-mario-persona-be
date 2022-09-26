import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PpLoggerService } from 'src/common/logger/logger.service';
import { ApmSpanAllMethods } from '../decorators/apm.decorator';
import { UseCache } from '../decorators/cache.decorator';
import { HttpUtilService } from '../utils/http-util.service';
import { VideoUrls } from './internal-api.urls';
import { InternalApiVideoDetailParams } from './types';

@ApmSpanAllMethods()
@Injectable()
export class VideoService {
  private BASE_URL: string;

  constructor(
    private configService: ConfigService, // @Inject('INTERNAL_BASE_URL') // private BASE_URL: string,
    private httpUtilService: HttpUtilService,
    private logger: PpLoggerService,
  ) {
    this.logger.setContext(VideoService.name);
    this.BASE_URL = this.configService.get('INTERNAL_BASE_URL');
  }

  @UseCache((mapper, searchParams) => ({
    hKey: mapper.INTERNAL,
    key: mapper.getVideoDetailKey(
      searchParams.organizationId,
      searchParams.videoType,
      searchParams.videoUrl,
    ),
  }))
  async getVideoDetail(searchParams: InternalApiVideoDetailParams) {
    try {
      const { videoType, videoUrl, organizationId } = searchParams;
      if (!(videoType in VideoUrls)) {
        this.logger.error('internal-api url not found ' + videoType);
        throw 'internal-api url not found ' + videoType;
      }
      const url = this.BASE_URL + VideoUrls[videoType];
      const headers = { organizationId };
      const body = { urls: [videoUrl] };
      const data = <any>await this.httpUtilService.post(url, body, headers);
      return data && Array.isArray(data) ? data[0] : null;
    } catch (error) {
      this.logger.error(
        'getVideoDetail: ',
        'arguments: ',
        JSON.stringify(arguments),
        'Error: ',
        JSON.stringify(error),
      );
      throw error;
    }
  }
}
