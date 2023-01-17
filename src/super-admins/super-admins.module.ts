import { Module } from '@nestjs/common';
import { SuperAdminsController } from './super-admins.controller';
import { SuperAdminsService } from './super-admins.service';

@Module({
  controllers: [SuperAdminsController],
  providers: [SuperAdminsService],
})
export class SuperAdminsModule {}
