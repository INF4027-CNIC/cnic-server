import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../common/decorators';
import { Roles } from '../../common/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log({ requiredRoles });

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    console.log({ user });

    return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}
