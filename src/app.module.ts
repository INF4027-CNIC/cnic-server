import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongodbModule } from './mongodb/mongodb.module';
import { AdminsModule } from './admins/admins.module';
import { AuthAdminModule } from './auth-admin/auth-admin.module';
import { AuthSuperAdminModule } from './auth-super-admin/auth-super-admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongodbModule.forRoot(),
    AdminsModule,
    AuthAdminModule,
    AuthSuperAdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
