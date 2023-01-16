import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetAdmin } from 'src/auth-admin/decorators';
import { AdminJwtGuard } from 'src/auth-admin/guards';
import { IsMongodbObjectIdPipe } from 'src/common/pipes';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminEntity } from './entities/admin.entity';
import { adminRoutes } from './enum/admin-controller';

@Controller(adminRoutes.admins)
@UseGuards(AdminJwtGuard)
export class AdminsController {
  private static readonly adminId = 'adminId';
  private static readonly adminCode = 'adminCode';

  constructor(private readonly adminService: AdminsService) {}

  @Get(adminRoutes.me)
  async me(@GetAdmin() admin: AdminEntity): Promise<AdminEntity> {
    console.log({ admin });

    return admin;
  }

  @Post(adminRoutes.create)
  async create(@Body() createAdminDto: CreateAdminDto): Promise<AdminEntity> {
    return this.adminService.create(createAdminDto);
  }

  @Get(`${adminRoutes.findByAdminCode}/:${AdminsController.adminCode}`)
  async findByAdminCode(
    @Param(AdminsController.adminCode, ParseIntPipe) adminCode: number,
  ): Promise<AdminEntity> {
    return this.adminService.findByAdminCode(adminCode);
  }

  @Get(`${adminRoutes.findOneById}/:${AdminsController.adminId}`)
  async findOneById(
    @Param(AdminsController.adminId, IsMongodbObjectIdPipe) adminId: string,
  ): Promise<any> {
    return this.adminService.findOneById(adminId);
  }

  /**
   * @TODO - implement this method
   */
  @Get(adminRoutes.findAll)
  async findAll() {
    return [
      {
        message: 'find all',
      },
    ];
  }

  /**
   * @TODO - implement this method
   */
  @Get(`${adminRoutes.findByName}`)
  async findByName() {
    //
  }
}
