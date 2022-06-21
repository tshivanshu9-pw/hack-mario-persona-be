import { ConfigService } from '@nestjs/config';
import { FilesUrls } from './internal-api.urls';
import * as FormData from 'form-data';
import { PpLoggerService } from 'src/boostrap/logger.service';
import { HttpUtilService } from '../utils/http-util.service';

export class FileService {
  private BASE_URL: string;

  constructor(
    private configService: ConfigService,
    private httpUtilService: HttpUtilService,
    private logger: PpLoggerService,
  ) {
    this.BASE_URL = this.configService.get('INTERNAL_BASE_URL');
  }
  async UpdateRemoteFilebyId(fileId: string, formData: FormData) {
    try {
      const url = this.BASE_URL + FilesUrls.updateRemoteFilebyId(fileId);
      const headers = { ...formData.getHeaders() };
      return await this.httpUtilService.put(url, formData, headers);
    } catch (error) {
      this.logger.error('UpdateRemoteFilebyId: ', ...arguments, error.message);
      throw error;
    }
  }
}
