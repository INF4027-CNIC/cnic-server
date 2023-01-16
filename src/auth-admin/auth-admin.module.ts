import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminsModule } from 'src/admins/admins.module';
import { AuthAdminController } from './auth-admin-controller.controller';
import { AuthAdminService } from './auth-admin-service.service';

@Module({
  imports: [JwtModule.register({}), AdminsModule],
  controllers: [AuthAdminController],
  providers: [AuthAdminService],
})
export class AuthAdminModule {}
