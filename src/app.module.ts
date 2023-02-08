import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongodbModule } from './mongodb/mongodb.module';
import { AdminsModule } from './admins/admins.module';
import { AuthAdminModule } from './auth-admin/auth-admin.module';
import { AuthSuperAdminModule } from './auth-super-admin/auth-super-admin.module';
import { SuperAdminsModule } from './super-admins/super-admins.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongodbModule.forRoot(),
    AdminsModule,
    // AuthAdminModule,
    AuthSuperAdminModule,
    SuperAdminsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
