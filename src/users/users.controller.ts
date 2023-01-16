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
import { UsersRoutes } from './enum';
import { UserEntity } from './entities';
import { ApiTags } from '@nestjs/swagger';
import { IsMongodbObjectIdPipe } from 'src/common/pipes';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller(UsersRoutes.users)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(UsersRoutes.create)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(UsersRoutes.searchByName)
  async searchByName(
    @Query('fullname', new DefaultValuePipe('')) fullname: string,
  ): Promise<UserEntity[]> {
    return this.usersService.searchByName(fullname);
  }

  @Get(UsersRoutes.allUsers)
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(`${UsersRoutes.findById}/:userId`)
  async findById(
    @Param('userId', IsMongodbObjectIdPipe) userId: string,
  ): Promise<UserEntity> {
    return this.usersService.findById(userId);
  }

  @Get(`${UsersRoutes.findByCode}/:userCode`)
  async findByCode(@Param('userCode') userCode: number): Promise<UserEntity> {
    return this.usersService.findByCode(userCode);
  }

  @Patch(`${UsersRoutes.updateById}/:userId`)
  async updateById(
    @Param('userId', IsMongodbObjectIdPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.updateById(userId, updateUserDto);
  }

  @Patch(`${UsersRoutes.updateByCode}/:userCode`)
  async updateByCode(
    @Param('userCode') userCode: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.updateByCode(userCode, updateUserDto);
  }

  @Delete(`${UsersRoutes.delete}/:userId`)
  async delete(
    @Param('userId', IsMongodbObjectIdPipe) userId: string,
  ): Promise<void> {
    this.usersService.delete(userId);
  }
}
