import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetSuperAdmin } from 'src/auth-super-admin/decorators';
import { IsMongodbObjectIdPipe } from 'src/common/pipes';
import { SuperAdminEntity } from './entities';
import { SuperAdminRoutes } from './enums/superAdminRoutes';
import { SuperAdminsService } from './super-admins.service';

@Controller(SuperAdminRoutes.superAdmins)
@ApiTags('Super-admins')
export class SuperAdminsController {
  private static readonly superAdminId = 'superAdminId';

  constructor(private readonly superAdminService: SuperAdminsService) {}

  @Get(SuperAdminRoutes.me)
  findMe(@GetSuperAdmin() superAdmin: SuperAdminEntity): SuperAdminEntity {
    return superAdmin;
  }

  @Get(`${SuperAdminRoutes.findById}/:${SuperAdminsController.superAdminId}`)
  async findOneById(
    @Param(SuperAdminsController.superAdminId, IsMongodbObjectIdPipe)
    superAdminId: string,
  ): Promise<SuperAdminEntity> {
    return this.superAdminService.findOneById(superAdminId);
  }
}
