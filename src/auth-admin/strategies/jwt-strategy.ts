import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT } from 'src/common/constants';
import { AuthAdminService } from '../auth-admin-service.service';
import { JwtPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT) {
  constructor(
    config: ConfigService,
    private readonly authAdminService: AuthAdminService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_ACCESS_TOKEN'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const admin = await this.authAdminService.jwtValidateAdmin(payload.sub);

    if (!admin) throw new UnauthorizedException('Not authorized.');

    return admin;
  }
}
