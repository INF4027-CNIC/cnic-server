import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetSuperAdmin = createParamDecorator(
  (property: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const superAdmin = request.user;

    return property ? superAdmin?.[property] : superAdmin;
  },
);
