import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CustomLogger = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.logger;
  },
);
