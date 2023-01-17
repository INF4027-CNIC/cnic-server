import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginSuperAdminDto } from 'src/auth-super-admin/dto';
import { SuperAdminRoutes } from './enums/superAdminRoutes';
import { SuperAdminsService } from './super-admins.service';

@Controller(SuperAdminRoutes.superAdmins)
export class SuperAdminsController {
  constructor(private readonly superAdminService: SuperAdminsService) {}

  @Post(SuperAdminRoutes.login)
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginSuperAdminDto: LoginSuperAdminDto) {
    return this.superAdminService.login(loginSuperAdminDto);
  }
}
