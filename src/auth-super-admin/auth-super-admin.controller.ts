import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Tokens } from 'src/auth-admin/types';
import { AuthSuperAdminService } from './auth-super-admin.service';
import { LoginSuperAdminDto } from './dto';
import { authSuperAdminRoutes } from './enums';

@Controller(authSuperAdminRoutes.authSuperAdmin)
export class AuthSuperAdminController {
  constructor(private readonly authSuperAdminService: AuthSuperAdminService) {}

  @Post(authSuperAdminRoutes.login)
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginSuperAdminDto: LoginSuperAdminDto): Promise<Tokens> {
    return this.authSuperAdminService.login(loginSuperAdminDto);
  }

  @Post(authSuperAdminRoutes.logout)
  @HttpCode(HttpStatus.OK)
  async logout(): Promise<any> {
    return this.authSuperAdminService.logout();
  }

  @Post(authSuperAdminRoutes.refresh)
  @HttpCode(HttpStatus.OK)
  async refresh(): Promise<any> {
    return this.authSuperAdminService.refresh();
  }
}
