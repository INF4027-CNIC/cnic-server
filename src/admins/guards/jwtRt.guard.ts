import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_REFRESH } from 'src/common/constants';

@Injectable()
export class AdminJwtRtGuard extends AuthGuard(JWT_REFRESH) {
  constructor() {
    super();
  }
}
