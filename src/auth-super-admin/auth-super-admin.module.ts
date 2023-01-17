import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminSchema } from 'src/mongodb/schemas';
import { AuthSuperAdminController } from './auth-super-admin.controller';
import { AuthSuperAdminService } from './auth-super-admin.service';
import { SUPER_ADMIN as SUPER_ADMIN_SCHEMA } from './auth-super-admin.contants';
import { JwtModule } from '@nestjs/jwt';
import { SuperAdminsModule } from 'src/super-admins/super-admins.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SUPER_ADMIN_SCHEMA, schema: SuperAdminSchema },
    ]),
    JwtModule.register({}),
    SuperAdminsModule,
  ],
  controllers: [AuthSuperAdminController],
  providers: [AuthSuperAdminService],
})
export class AuthSuperAdminModule {}
