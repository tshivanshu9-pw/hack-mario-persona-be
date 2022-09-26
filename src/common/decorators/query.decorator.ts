import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CustomQuery = createParamDecorator(
  async (value, ctx: ExecutionContext) => {
    const type = ctx.getType();
    if (type == 'rpc') {
      const { query = {} } = ctx.switchToRpc().getData();
      return value ? query[value] : query;
    } else if (type == 'http') {
      const query = ctx.switchToHttp().getRequest().query;
      return value ? query[value] : query;
    }
  },
);
