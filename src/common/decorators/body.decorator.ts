import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CustomBody = createParamDecorator(
  async (value, ctx: ExecutionContext) => {
    const type = ctx.getType();
    if (type == 'rpc') {
      const { body = {} } = ctx.switchToRpc().getData();
      return value ? body[value] : body;
    } else if (type == 'http') {
      const body = ctx.switchToHttp().getRequest().body;
      return value ? body[value] : body;
    }
  },
);
