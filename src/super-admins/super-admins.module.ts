import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminSchema } from 'src/mongodb/schemas';
import { SUPER_ADMIN as SUPER_ADMIN_MODEL_TOKEN } from './super-admin.constant';
import { SuperAdminsController } from './super-admins.controller';
import { SuperAdminsService } from './super-admins.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SUPER_ADMIN_MODEL_TOKEN,
        schema: SuperAdminSchema,
      },
    ]),
  ],
  controllers: [SuperAdminsController],
  providers: [SuperAdminsService],
  exports: [SuperAdminsService],
})
export class SuperAdminsModule {}
