import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CustomParams = createParamDecorator(
  async (value, ctx: ExecutionContext) => {
    const type = ctx.getType();
    if (type == 'rpc') {
      const { params = {} } = ctx.switchToRpc().getData();
      return value ? params[value] : params;
    } else if (type == 'http') {
      const params = ctx.switchToHttp().getRequest().params;
      return value ? params[value] : params;
    }
  },
);
