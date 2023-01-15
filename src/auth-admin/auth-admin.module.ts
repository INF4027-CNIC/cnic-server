import { Module } from '@nestjs/common';
import { AdminsModule } from 'src/admins/admins.module';
import { AuthAdminController } from './auth-admin-controller.controller';
import { AuthAdminService } from './auth-admin-service.service';

@Module({
  imports: [AdminsModule],
  controllers: [AuthAdminController],
  providers: [AuthAdminService],
})
export class AuthAdminModule {}
