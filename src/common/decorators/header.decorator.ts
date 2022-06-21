import { createParamDecorator, ExecutionContext } from '@nestjs/common';

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
);
