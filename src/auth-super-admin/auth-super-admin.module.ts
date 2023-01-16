import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminSchema } from 'src/mongodb/schemas';
import { AuthSuperAdminController } from './auth-super-admin-controller.controller';
import { AuthSuperAdminService } from './auth-super-admin-service.service';
import { SUPER_ADMIN as SUPER_ADMIN_SCHEMA } from './auth-super-admin.contants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SUPER_ADMIN_SCHEMA, schema: SuperAdminSchema },
    ]),
  ],
  controllers: [AuthSuperAdminController],
  providers: [AuthSuperAdminService],
})
export class AuthSuperAdminModule {}
