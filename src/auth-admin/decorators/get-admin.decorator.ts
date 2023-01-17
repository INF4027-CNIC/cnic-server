import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetAdmin = createParamDecorator(
  (property: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const admin = request.user;

    return property ? admin?.[property] : admin;
  },
);
