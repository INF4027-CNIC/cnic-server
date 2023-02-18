import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
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
  SwaggerUploadImageDoc,
} from './decorators/swagger-doc.decorator';
import { ApiTags } from '@nestjs/swagger';
import { PublicRoute } from 'src/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadOperations } from 'src/upload-file/utils';
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

  @Post('upload-image')
  @SwaggerUploadImageDoc()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: UploadOperations.getDestination,
        filename: UploadOperations.getFilename,
      }),
    }),
  )
  uploadFoodImage(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
      }),
    )
    foodImage: Express.Multer.File,
  ) {
    return { image: foodImage.filename };
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
