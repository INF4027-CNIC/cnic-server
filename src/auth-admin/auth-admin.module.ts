import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AdminsModule } from 'src/admins/admins.module';
import { AuthAdminController } from './auth-admin-controller.controller';
import { AuthAdminService } from './auth-admin-service.service';
import { AdminJwtGuard } from './guards';
import { JwtRefreshStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [JwtModule.register({}), AdminsModule],
  controllers: [AuthAdminController],
  providers: [
    AuthAdminService,
    JwtStrategy,
    JwtRefreshStrategy,
    { provide: APP_GUARD, useClass: AdminJwtGuard },
  ],
})
export class AuthAdminModule {}
