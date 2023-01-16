import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthAdminService } from './auth-admin-service.service';
import { LoginAdminDto } from './dto';
import { authAdminRoutes } from './enums';

@Controller(authAdminRoutes.authAdmin)
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Post(authAdminRoutes.login)
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginAdminDto: LoginAdminDto): Promise<any> {
    return await this.authAdminService.login(loginAdminDto);
  }

  /**
   * @TOD0 - Implement logout
   */
  @Post(authAdminRoutes.logout)
  @HttpCode(HttpStatus.OK)
  async logout(): Promise<any> {
    return await this.authAdminService.logout();
  }

  /**
   * @TOD0 - Implement refresh
   */
  @Post(authAdminRoutes.refresh)
  @HttpCode(HttpStatus.OK)
  async refresh(): Promise<any> {
    return await this.authAdminService.refresh();
  }
}
