import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiHeaders, ApiHeaderOptions } from '@nestjs/swagger';

export const CustomHeaders = createParamDecorator(
  async (value, ctx: ExecutionContext) => {
    const type = ctx.getType();
    if (type == 'rpc') {
      const headers = ctx.switchToRpc().getContext().getMap();
      return value ? headers[value] : headers;
    } else if (type == 'http') {
      const headers = ctx.switchToHttp().getRequest().headers;
      return value ? headers[value] : headers;
    }
  },
  [
    (target: any, key: string, parameterIndex: number) => {
      const apiHeaders: ApiHeaderOptions[] = [];

      const metaData = Reflect.getMetadata('design:paramtypes', target, key)[
        parameterIndex
      ];

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
      if (metaData.name == 'HeaderOrganizationAuthDto') {
        apiHeaders.push(
          {
            name: 'organization_id',
            description: 'Custom Header: Organization Id',
            allowEmptyValue: false,
          },
          {
            name: 'authorization',
            description: 'Custom Header: authorization',
            allowEmptyValue: false,
          },
        );
      }
      if (metaData.name == 'HeaderUserOrganizationAuthDto') {
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
          {
            name: 'authorization',
            description: 'Custom Header: authorization',
            allowEmptyValue: false,
          },
        );
      }
      if (metaData.name == 'HeaderAuthDto') {
        apiHeaders.push({
          name: 'authorization',
          description: 'Custom Header: authorization',
          allowEmptyValue: false,
        });
      }

      ApiHeaders(apiHeaders)(
        target,
        key,
        Object.getOwnPropertyDescriptor(target, key),
      );
    },
  ],
);
