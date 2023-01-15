import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { ADMIN as ADMINS_MODEL_TEKEN } from './admins.constant';
import { AdminSchema } from 'src/mongodb/schemas/admin.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: ADMINS_MODEL_TEKEN,
        schema: AdminSchema,
      },
    ]),
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [MongooseModule, AdminsService],
})
export class AdminsModule {}
