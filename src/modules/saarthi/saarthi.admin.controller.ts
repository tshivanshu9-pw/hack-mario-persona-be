import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CustomBody } from 'src/common/decorators/body.decorator';
import { CustomHeaders } from 'src/common/decorators/header.decorator';
import { CustomParams } from 'src/common/decorators/param.decorator';
import { CustomQuery } from 'src/common/decorators/query.decorator';
import {
  HeaderOrganizationDto,
  HeaderUserOrganizationDto,
} from 'src/common/dto/headers.dto';
import { PageLimitDto } from 'src/common/dto/pagination.dto';
import { SaarthiDto, SaarthiIdParam } from './dto/saarthi.dto';
import { SaarthiService } from './saarthi.service';

@ApiTags('Saarthi-Admin-APIs')
@Controller('')
export class SaarthiAdminController {
  constructor(private saarthiService: SaarthiService) {}

  /**
   * Creating Saarthi Data
   */
  @Post()
  // @GrpcMethod('SaarthiService', 'create')
  async createSaarthi(
    @CustomHeaders() headers: HeaderUserOrganizationDto,
    @CustomBody() body: SaarthiDto,
  ) {
    await this.saarthiService.createSaarthi(headers, body);
    return;
  }

  /**
   * Listing Saarthi Data
   */
  @Get()
  async listSaarthi(
    @CustomHeaders() headers: HeaderOrganizationDto,
    @CustomQuery() query: PageLimitDto,
  ) {
    const { data, totalCount } = await this.saarthiService.listSaarthi(
      headers,
      query,
    );
    const paginate = { totalCount, limit: query.limit, page: query.page };
    return { paginate, data };
  }

  /**
   * Updating the Saarthi Data
   */
  @Put('/:saarthi_id')
  async updateSaarthi(
    @CustomHeaders() headers: HeaderOrganizationDto,
    @CustomParams() params: SaarthiIdParam,
    @CustomBody() body: SaarthiDto,
  ) {
    await this.saarthiService.updateSaarthi(headers, params, body);
    return;
  }

  /**
   * Deleting the Saarthi
   */
  @Delete('/:saarthi_id')
  async deleteSaarthi(
    @CustomHeaders() headers: HeaderOrganizationDto,
    @CustomParams() params: SaarthiIdParam,
  ) {
    await this.saarthiService.inactivateSaarthi(headers, params);
    return;
  }
}
