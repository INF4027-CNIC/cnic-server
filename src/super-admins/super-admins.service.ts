import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperAdmin } from 'src/mongodb/schemas';
import { LoginAdminDto } from './dto';
import { SUPER_ADMIN } from './super-admin.constant';

@Injectable()
export class SuperAdminsService {
  constructor(
    @InjectModel(SUPER_ADMIN)
    private readonly superAdminModel: Model<SuperAdmin>,
  ) {}

  async login(loginSuperAdminDto: LoginAdminDto) {
    return loginSuperAdminDto;
  }
}
