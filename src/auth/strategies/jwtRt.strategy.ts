import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_REFRESH } from '../auth.constant';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../types';
import { Request } from 'express';
import { UserEntity } from 'src/users/entities';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH,
) {
  constructor(config: ConfigService, private authService: AuthService) {
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

    const userData = await this.authService.jwtRefreshValidateUser(
      payload.sub,
      bearerRefreshToken,
    );

    if (!userData) throw new UnauthorizedException('Not authorized.');

    const user = new UserEntity(userData);

    user.setBearerRefreshToken(bearerRefreshToken);

    return user;
  }
}
