import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdminJwtGuard } from 'src/auth-admin/guards';
import { ROLES_KEY } from '../../common/decorators';
import { Roles } from '../../common/enums';

@Injectable()
export class RolesGuard extends AdminJwtGuard implements CanActivate {
  constructor(private reflectorRole: Reflector) {
    super(reflectorRole);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await super.canActivate(context);

    if (!isAuthenticated) return false;

    const requiredRoles = this.reflectorRole.getAllAndOverride<Roles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const { user: currentUser } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => currentUser?.getRoles?.includes(role));
  }
}
