import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';
import { Request } from 'express';
import { JWT_REFRESH } from 'src/common/constants';
import { AuthAdminService } from '../auth-admin-service.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH,
) {
  constructor(
    config: ConfigService,
    private readonly authAdminService: AuthAdminService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_REFRESH_TOKEN'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const bearerRefreshToken = req.headers.authorization
      .replace('Bearer', '')
      .trim();

    const admin = await this.authAdminService.jwtRefreshValidateAdmin(
      payload.sub,
      bearerRefreshToken,
    );

    if (!admin) throw new UnauthorizedException('Not authorized.');

    admin.setBearerRt(bearerRefreshToken);

    return admin;
  }
}
