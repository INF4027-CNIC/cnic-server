import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongodbModule } from './mongodb/mongodb.module';
import { AdminsModule } from './admins/admins.module';
import { ServiceController } from './service/service.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), MongodbModule.forRoot(), AdminsModule],
  controllers: [AppController, ServiceController],
  providers: [AppService],
})
export class AppModule {}
