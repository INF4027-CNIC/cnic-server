import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAdmin } from 'src/auth-admin/decorators';
import { AdminJwtGuard } from 'src/auth-admin/guards';
import { IsMongodbObjectIdPipe } from 'src/common/pipes';
import { AdminsService } from './admins.service';
import {
  SwaggerCreateAdminDoc,
  SwaggerFindAdminDoc,
} from './decorators/swagger-doc.decorator';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminEntity } from './entities/admin.entity';
import { adminRoutes } from './enum/admin-controller';

@Controller(adminRoutes.admins)
@UseGuards(AdminJwtGuard)
@ApiTags('Admins')
@ApiBearerAuth()
export class AdminsController {
  private static readonly adminId = 'adminId';
  private static readonly adminCode = 'adminCode';

  constructor(private readonly adminService: AdminsService) {}

  @Get(adminRoutes.me)
  @SwaggerFindAdminDoc()
  async me(@GetAdmin() admin: AdminEntity): Promise<AdminEntity> {
    return admin;
  }

  @Post(adminRoutes.create)
  @SwaggerCreateAdminDoc()
  async create(@Body() createAdminDto: CreateAdminDto): Promise<AdminEntity> {
    return this.adminService.create(createAdminDto);
  }

  @Get(`${adminRoutes.findByAdminCode}/:${AdminsController.adminCode}`)
  @SwaggerFindAdminDoc()
  async findByAdminCode(
    @Param(AdminsController.adminCode, ParseIntPipe) adminCode: number,
  ): Promise<AdminEntity> {
    return this.adminService.findByAdminCode(adminCode);
  }

  @Get(`${adminRoutes.findOneById}/:${AdminsController.adminId}`)
  @SwaggerFindAdminDoc()
  async findOneById(
    @Param(AdminsController.adminId, IsMongodbObjectIdPipe) adminId: string,
  ): Promise<AdminEntity> {
    return this.adminService.findOneById(adminId);
  }
}
