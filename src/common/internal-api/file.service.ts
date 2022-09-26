import { ConfigService } from '@nestjs/config';
import { FilesUrls } from './internal-api.urls';
import * as FormData from 'form-data';
import { PpLoggerService } from 'src/common/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { ApmSpanAllMethods } from '../decorators/apm.decorator';
import { HttpUtilService } from '../utils/http-util.service';

@ApmSpanAllMethods()
@Injectable()
export class FileService {
  private BASE_URL: string;

  constructor(
    private configService: ConfigService,
    private httpUtilService: HttpUtilService,
    private logger: PpLoggerService,
  ) {
    logger.setContext(FileService.name);
    this.BASE_URL = this.configService.get('INTERNAL_BASE_URL');
  }
  async UpdateRemoteFilebyId(fileId: string, formData: FormData) {
    try {
      const url = this.BASE_URL + FilesUrls.updateRemoteFilebyId(fileId);
      const headers = { ...formData.getHeaders() };
      return await this.httpUtilService.put(url, formData, headers);
    } catch (error) {
      this.logger.error(
        'UpdateRemoteFilebyId: ',
        'arguments: ',
        JSON.stringify(arguments),
        'Error: ',
        JSON.stringify(error),
      );
      throw error;
    }
  }
}
