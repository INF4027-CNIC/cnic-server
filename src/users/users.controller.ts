import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { usersController } from './enum';
import { UserEntity } from './entities';
import { ApiTags } from '@nestjs/swagger';
import { IsMongodbObjectIdPipe } from 'src/common/pipes';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller(usersController.users)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(usersController.create)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(usersController.searchByName)
  async searchByName(
    @Query('fullname', new DefaultValuePipe('')) fullname: string,
  ): Promise<UserEntity[]> {
    return this.usersService.searchByName(fullname);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(`${usersController.findById}/:userId`)
  async findById(
    @Param('userId', IsMongodbObjectIdPipe) userId: string,
  ): Promise<UserEntity> {
    return this.usersService.findById(userId);
  }

  @Get(`${usersController.findByCode}/:userCode`)
  async findByCode(
    @Param('userCode', IsMongodbObjectIdPipe) userCode: number,
  ): Promise<UserEntity> {
    return this.usersService.findByCode(userCode);
  }

  @Patch(`${usersController.update}/:userId`)
  async update(
    @Param('userId', IsMongodbObjectIdPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(`${usersController.delete}/:userId`)
  async delete(
    @Param('userId', IsMongodbObjectIdPipe) userId: string,
  ): Promise<void> {
    this.usersService.delete(userId);
  }
}
