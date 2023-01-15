import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/users/entities';
import { JWT } from '../auth.constant';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT) {
  constructor(
    config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_ACCESS_TOKEN'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.jwtValidateUser(payload.sub);

    if (!user) throw new UnauthorizedException('Not authorized.');

    return new UserEntity(user);
  }
}
