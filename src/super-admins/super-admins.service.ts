import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperAdmin } from 'src/mongodb/schemas';
import { SuperAdminEntity } from './entities';
import { SuperAdminNotFoundException } from './exceptions';
import { SUPER_ADMIN } from './super-admin.constant';

@Injectable()
export class SuperAdminsService {
  constructor(
    @InjectModel(SUPER_ADMIN)
    private readonly superAdminModel: Model<SuperAdmin>,
  ) {}

  async findOneById(superAdminId: string): Promise<SuperAdminEntity> {
    try {
      const foundSuperAdmin = await this.superAdminModel.findById<SuperAdmin>(
        superAdminId,
      );

      if (!foundSuperAdmin) throw new SuperAdminNotFoundException(superAdminId);

      return new SuperAdminEntity(foundSuperAdmin);
    } catch (err) {
      throw err;
    }
  }

  async findOneByEmail(email: string): Promise<SuperAdminEntity> {
    try {
      const foundSuperAdmin = await this.superAdminModel.findOne<SuperAdmin>({
        email,
      });

      if (!foundSuperAdmin) throw new SuperAdminNotFoundException();

      return new SuperAdminEntity(foundSuperAdmin);
    } catch (err) {
      throw err;
    }
  }
}
