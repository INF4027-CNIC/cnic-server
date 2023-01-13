import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_REFRESH } from '../auth.constant';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(JWT_REFRESH) {
  constructor() {
    super();
  }
}
