import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserUrls } from './internal-api.urls';
import { Types } from 'mongoose';
import { CreateUserData, UpdateUserData } from './dto/user.dto';
import { PpLoggerService } from 'src/boostrap/logger.service';
import { HttpUtilService } from '../utils/http-util.service';

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

  async createUser(body: CreateUserData) {
    try {
      const url = this.BASE_URL + UserUrls.createUser;
      const data: any = await this.httpUtilService.post(url, body, {});
      return data; //TODO: when internal api not connected
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      throw error;
    }
  }

  async updateUser(userId: Types.ObjectId, body: UpdateUserData) {
    try {
      const url = this.BASE_URL + UserUrls.updateUser(userId.toString());
      await this.httpUtilService.put(url, body, {});
      return;
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      throw error;
    }
  }

  // async userAggregate(aggrigate: any) {
  //   try {
  //     const url = this.BASE_URL + UserUrls['userAggregate'];
  //     const body = { query: aggrigate };
  //     const  data : any = await this.httpUtilService.post(url, body, {});
  //     return data;
  //   } catch (error) {
  //     this.logger.error('userAggregate: ', ...arguments, error.message);
  //     throw error;
  //   }
  // }
}
