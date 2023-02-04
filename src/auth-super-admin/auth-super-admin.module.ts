import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminSchema } from 'src/mongodb/schemas';
import { AuthSuperAdminController } from './auth-super-admin.controller';
import { AuthSuperAdminService } from './auth-super-admin.service';
import { SUPER_ADMIN as SUPER_ADMIN_SCHEMA } from './auth-super-admin.contants';
import { SuperAdminsModule } from 'src/super-admins/super-admins.module';
import { JwtRefreshStrategy, JwtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: SUPER_ADMIN_SCHEMA, schema: SuperAdminSchema },
    ]),
    SuperAdminsModule,
  ],
  controllers: [AuthSuperAdminController],
  providers: [AuthSuperAdminService, JwtStrategy, JwtRefreshStrategy],
})
export class AuthSuperAdminModule {}
