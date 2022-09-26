import { Injectable } from '@nestjs/common';
import { Params } from 'src/common/base-repository/types/params.interface';
import {
  HeaderOrganizationDto,
  HeaderUserOrganizationDto,
} from 'src/common/dto/headers.dto';
import { PageLimitDto } from 'src/common/dto/pagination.dto';
import { SlugService } from 'src/common/utils/slug.service';
import { SaarthiDto } from '../dto/saarthi.dto';
import { SaarthiStatusEnum } from '../saarthi.enum';
import { Saarthi } from '../schema/saarthi.schema';

@Injectable()
export class SaarthiMapper {
  constructor(private slugService: SlugService) {}
  mapToListParams(headers: HeaderOrganizationDto, query: PageLimitDto) {
    const params: Params<Saarthi> = {
      searchParams: {
        ...headers,
        status: {
          $in: [SaarthiStatusEnum.Active, SaarthiStatusEnum.Invisible],
        },
      },
      ...query,
      sort: { _id: -1 },
      project: {
        organization_id: 0,
        created_by: 0,
        created_at: 0,
        updated_at: 0,
      },
    };
    return params;
  }

  mapToCreateData(headers: HeaderUserOrganizationDto, body: SaarthiDto) {
    const data: Saarthi = {
      organization_id: headers.organization_id,
      created_by: headers.user_id,
      ...body,
      slug: this.slugService.createSlug(body.title),
    };
    return data;
  }
}
