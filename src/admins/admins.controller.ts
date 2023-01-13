import { Controller, Get, Param, Post } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { adminController } from './enum/admin-controller';

@Controller(adminController.admins)
export class AdminsController {
  private static readonly adminId = 'adminId';

  constructor(private readonly adminService: AdminsService) {}

  @Post(adminController.create)
  async create() {
    return {
      mesage: 'create',
    };
  }

  @Get(adminController.findAll)
  async findAll() {
    return {
      message: 'find all',
    };
  }

  @Get(`${adminController.findOne}/${AdminsController.adminId}`)
  async findOneById(@Param(AdminsController.adminId) adminId: string) {
    return {
      message: adminId,
    };
  }
}
