import { Body, Controller, Post } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminEntity } from './entities/admin.entity';
import { adminRoutes } from './enum/admin-controller';

@Controller(adminRoutes.admins)
export class AdminsController {
  private static readonly adminId = 'adminId';

  constructor(private readonly adminService: AdminsService) {}

  @Post(adminRoutes.create)
  async create(@Body() createAdminDto: CreateAdminDto): Promise<AdminEntity> {
    return this.adminService.create(createAdminDto);
  }

  // @Get(adminRoutes.findAll)
  // async findAll() {
  //   return [
  //     {
  //       message: 'find all',
  //     },
  //   ];
  // }

  // @Get(`${adminRoutes.findOneById}/${AdminsController.adminId}`)
  // async findOneById(
  //   @Param(AdminsController.adminId) adminId: string,
  // ): Promise<any> {
  //   return {
  //     message: adminId,
  //   };
  // }

  // @Get(`${adminRoutes.findByName}`)
  // async findByName(): Promise<any[]> {
  //   //
  // }
}
