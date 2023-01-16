import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminEntity } from 'src/admins/entities/admin.entity';
import { PublicRoute } from 'src/common/decorators';
import { AuthAdminService } from './auth-admin.service';
import { GetAdmin } from './decorators';
import { LoginAdminDto } from './dto';
import { authAdminRoutes } from './enums';
import { AdminJwtRtGuard } from './guards';
import { Tokens } from './types';

@Controller(authAdminRoutes.authAdmin)
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Post(authAdminRoutes.login)
  @HttpCode(HttpStatus.OK)
  @PublicRoute()
  async login(@Body() loginAdminDto: LoginAdminDto): Promise<any> {
    return await this.authAdminService.login(loginAdminDto);
  }

  @Post(authAdminRoutes.logout)
  @HttpCode(HttpStatus.OK)
  async logout(@GetAdmin('id') adminId: string): Promise<void> {
    return await this.authAdminService.logout(adminId);
  }

  @Post(authAdminRoutes.refreshTokens)
  @HttpCode(HttpStatus.OK)
  @PublicRoute()
  @UseGuards(AdminJwtRtGuard)
  async refreshToken(@GetAdmin() admin: AdminEntity): Promise<Tokens> {
    return await this.authAdminService.refreshTokens(
      admin.getId,
      admin.getBearerRt,
    );
  }

  /**
   * @TODO - Implement update password
   */
  @Patch(authAdminRoutes.updatePassword)
  async updatePassword(): Promise<any> {
    return {
      message: 'Update password successfully',
    };
  }

  /**
   * @TODO - Implement update admin code
   */
  async updateAdminCode(): Promise<any> {
    return {
      message: 'Update admin code successfully',
    };
  }
}
