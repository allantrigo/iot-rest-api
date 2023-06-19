import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const TokenDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user.id;

    return user;
  },
);
