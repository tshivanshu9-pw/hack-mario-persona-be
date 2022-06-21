import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiHeaders, ApiHeaderOptions } from '@nestjs/swagger';

export const CustomHeaders = createParamDecorator(
  async (value, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;
    // if ('organizationid' in headers) {
    //   headers['organizationId'] = headers['organizationid'];
    //   // delete headers['organizationid']
    // }
    // if ('userid' in headers) {
    //   headers['userId'] = headers['userid'];
    //   // delete headers['userid']
    // }

    return value ? headers[value] : headers;
  },
  [
    (target: any, key: string) => {
      const apiHeaders: ApiHeaderOptions[] = [];
      Reflect.getMetadata('design:paramtypes', target, key).forEach(
        (metaData) => {
          if (metaData.name == 'HeaderOrganizationDto') {
            apiHeaders.push({
              name: 'organization_id',
              description: 'Custom Header: Organization Id',
              allowEmptyValue: false,
            });
          }
          if (metaData.name == 'HeaderUserDto') {
            apiHeaders.push({
              name: 'user_id',
              description: 'Custom Header: User Id',
              allowEmptyValue: false,
            });
          }
          if (metaData.name == 'HeaderUserOrganizationDto') {
            apiHeaders.push(
              {
                name: 'organization_id',
                description: 'Custom Header: Organization Id',
                allowEmptyValue: false,
              },
              {
                name: 'user_id',
                description: 'Custom Header: User Id',
                allowEmptyValue: false,
              },
            );
          }
        },
      );
      ApiHeaders(apiHeaders)(
        target,
        key,
        Object.getOwnPropertyDescriptor(target, key),
      );
    },
  ],
);
