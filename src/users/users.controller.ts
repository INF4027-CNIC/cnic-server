import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRoutes } from './enum';
import { UserEntity } from './entities';
import { IsMongodbObjectIdPipe } from 'src/common/pipes';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserCodeDTO } from './dto/update-code.dto';
import {
  SwaggerGetUsersDoc,
  SwaggerPatchUsersDoc,
  SwaggerPostUsersDoc,
  SwaggerDeleteUsersDoc,
  SwaggerPatchCodeUsersDoc,
} from './decorators/swagger-doc.decorator';
import { ApiTags } from '@nestjs/swagger';
import { PublicRoute, Role } from 'src/common/decorators';
import { Roles } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards';

// @Role(Roles.Admin)
// @UseGuards(RolesGuard)
@Controller(UsersRoutes.users)
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(UsersRoutes.create)
  @HttpCode(HttpStatus.CREATED)
  @SwaggerPostUsersDoc()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log({ create: 'create' });

    return this.usersService.create(createUserDto);
  }

  @Get(UsersRoutes.searchByName)
  @HttpCode(HttpStatus.OK)
  @SwaggerGetUsersDoc()
  async searchByName(
    @Query('fullname', new DefaultValuePipe('')) fullname: string,
  ): Promise<UserEntity[]> {
    return this.usersService.searchByName(fullname);
  }

  @Get(UsersRoutes.allUsers)
  @HttpCode(HttpStatus.OK)
  @SwaggerGetUsersDoc()
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(`${UsersRoutes.findById}/:userId`)
  @HttpCode(HttpStatus.OK)
  @SwaggerGetUsersDoc(true)
  async findById(
    @Param('userId', IsMongodbObjectIdPipe) userId: string,
  ): Promise<UserEntity> {
    return this.usersService.findById(userId);
  }

  @PublicRoute()
  @Get(`${UsersRoutes.findByCode}/:userCode`)
  @HttpCode(HttpStatus.OK)
  @SwaggerGetUsersDoc(true)
  async findByCode(@Param('userCode') userCode: number): Promise<UserEntity> {
    return this.usersService.findByCode(userCode);
  }

  @Patch(`${UsersRoutes.updateById}/:userId`)
  @HttpCode(HttpStatus.OK)
  @SwaggerPatchUsersDoc()
  async updateById(
    @Param('userId', IsMongodbObjectIdPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.updateById(userId, updateUserDto);
  }

  @Patch(`${UsersRoutes.updateCodeById}/:userId`)
  @HttpCode(HttpStatus.OK)
  @SwaggerPatchCodeUsersDoc()
  async updateUserCodeById(
    @Param('userId', IsMongodbObjectIdPipe) userId: string,
    @Body() userCode: UpdateUserCodeDTO,
  ): Promise<UserEntity> {
    return this.usersService.updateUserCodeById(userId, userCode);
  }

  @Patch(`${UsersRoutes.updateByCode}/:userCode`)
  @HttpCode(HttpStatus.OK)
  @SwaggerPatchUsersDoc()
  async updateByCode(
    @Param('userCode') userCode: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.updateByCode(userCode, updateUserDto);
  }

  @Delete(`${UsersRoutes.delete}/:userId`)
  @HttpCode(HttpStatus.NO_CONTENT)
  @SwaggerDeleteUsersDoc()
  async delete(
    @Param('userId', IsMongodbObjectIdPipe) userId: string,
  ): Promise<void> {
    this.usersService.delete(userId);
  }
}
