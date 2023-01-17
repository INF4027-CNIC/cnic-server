import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT } from 'src/common/constants';
import { AuthSuperAdminService } from '../auth-super-admin.service';
import { JwtPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT) {
  constructor(
    config: ConfigService,
    private readonly authSuperAdminService: AuthSuperAdminService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_ACCESS_TOKEN'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const superAdmin = await this.authSuperAdminService.jwtValidateSuperAdmin(
      payload.sub,
    );

    if (!superAdmin) throw new UnauthorizedException('Not authorized.');

    return superAdmin;
  }
}
