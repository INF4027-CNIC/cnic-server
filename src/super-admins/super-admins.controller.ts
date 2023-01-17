import { Controller, Get, Param } from '@nestjs/common';
import { IsMongodbObjectIdPipe } from 'src/common/pipes';
import { SuperAdminEntity } from './entities';
import { SuperAdminRoutes } from './enums/superAdminRoutes';
import { SuperAdminsService } from './super-admins.service';

@Controller(SuperAdminRoutes.superAdmins)
export class SuperAdminsController {
  private static readonly superAdminId = 'superAdminId';

  constructor(private readonly superAdminService: SuperAdminsService) {}

  @Get(`${SuperAdminRoutes.findById}/:${SuperAdminsController.superAdminId}`)
  async findOneById(
    @Param(SuperAdminsController.superAdminId, IsMongodbObjectIdPipe)
    superAdminId: string,
  ): Promise<SuperAdminEntity> {
    return this.superAdminService.findOneById(superAdminId);
  }
}
