import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminSchema } from 'src/mongodb/schemas';
import { AuthSuperAdminController } from './auth-super-admin.controller';
import { AuthSuperAdminService } from './auth-super-admin.service';
import { SUPER_ADMIN as SUPER_ADMIN_SCHEMA } from './auth-super-admin.contants';
import { SuperAdminsModule } from 'src/super-admins/super-admins.module';
import { JwtRefreshStrategy, JwtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { SuperAdminJwtGuard, SuperAdminJwtRtGuard } from './guards';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: SUPER_ADMIN_SCHEMA, schema: SuperAdminSchema },
    ]),
    SuperAdminsModule,
  ],
  controllers: [AuthSuperAdminController],
  providers: [{
    provide: APP_GUARD,
    useClass: SuperAdminJwtGuard,
  }, JwtRefreshStrategy, AuthSuperAdminService, JwtStrategy, SuperAdminJwtRtGuard],
})
export class AuthSuperAdminModule {}
