import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserUrls } from './internal-api.urls';
import { Types } from 'mongoose';
import { DeleteCache } from '../decorators/cache.decorator';
import { PpLoggerService } from 'src/common/logger/logger.service';
import { ApmSpanAllMethods } from '../decorators/apm.decorator';
import { ICreateUser, IUpdateUser } from './types/user.interface';
import { HttpUtilService } from '../utils/http-util.service';

@ApmSpanAllMethods()
@Injectable()
export class UserService {
  private BASE_URL: string;

  constructor(
    private configService: ConfigService, // @Inject('INTERNAL_BASE_URL') // private BASE_URL: string,
    private httpUtilService: HttpUtilService,
    private logger: PpLoggerService,
  ) {
    this.logger.setContext(UserService.name);
    this.BASE_URL = this.configService.get('INTERNAL_BASE_URL');
  }

  async createUser(body: ICreateUser) {
    try {
      const url = this.BASE_URL + UserUrls.createUser;
      const data: any = await this.httpUtilService.post(url, body, {});
      return data; //TODO: when internal api not connected
    } catch (error) {
      this.logger.error(
        'createUser: ',
        'arguments: ',
        JSON.stringify(arguments),
        'Error: ',
        JSON.stringify(error),
      );
      throw error;
    }
  }

  @DeleteCache((mapper, userId: Types.ObjectId, body: IUpdateUser) => ({
    hKey: mapper.INTERNAL,
    key: mapper.internalApiIdDetailKey('userId', userId.toString()),
  }))
  async updateUser(userId: Types.ObjectId, body: IUpdateUser) {
    try {
      const url = this.BASE_URL + UserUrls.updateUser(userId.toString());
      await this.httpUtilService.put(url, body, {});
      return;
    } catch (error) {
      this.logger.error(
        'updateUser: ',
        'arguments: ',
        JSON.stringify(arguments),
        'Error: ',
        JSON.stringify(error),
      );
      throw error;
    }
  }
}
