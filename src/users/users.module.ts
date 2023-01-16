import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminJwtGuard } from 'src/auth-admin/guards';
import { UserSchema } from 'src/mongodb/schemas';
import { UsersController } from './users.controller';
import { USER as USER_MODEL_TOKEN } from './users.costants';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_MODEL_TOKEN,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, { provide: APP_GUARD, useClass: AdminJwtGuard }],
  exports: [UsersService],
})
export class UsersModule {}
