import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperAdmin } from 'src/mongodb/schemas';
import { SUPER_ADMIN as SUPER_ADMIN_MODEL_TOKEN } from './auth-super-admin.contants';
import { LoginSuperAdminDto } from './dto';

@Injectable()
export class AuthSuperAdminService {
  constructor(
    @InjectModel(SUPER_ADMIN_MODEL_TOKEN)
    private readonly superAdminModel: Model<SuperAdmin>,
  ) {}

  async login(loginSuperAdminDto: LoginSuperAdminDto): Promise<any> {
    return loginSuperAdminDto;
  }

  async logout(): Promise<any> {
    return {
      message: 'logging out',
    };
  }

  async refresh(): Promise<any> {
    return {
      message: 'refreshing',
    };
  }
}
