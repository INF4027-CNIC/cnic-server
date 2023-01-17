import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminsModule } from 'src/admins/admins.module';
import { AuthAdminController } from './auth-admin.controller';
import { AuthAdminService } from './auth-admin.service';
import { JwtRefreshStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [JwtModule.register({}), AdminsModule],
  controllers: [AuthAdminController],
  providers: [AuthAdminService, JwtStrategy, JwtRefreshStrategy],
})
export class AuthAdminModule {}
