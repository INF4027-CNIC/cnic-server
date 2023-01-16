import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ADMIN as ADMINS_MODEL_TEKEN } from 'src/admins/admins.constant';
import { AdminsService } from 'src/admins/admins.service';
import { AdminEntity } from 'src/admins/entities/admin.entity';
import { AdminNotFoundException } from 'src/admins/exceptions';
import { isPasswordMatched } from 'src/common/helpers';
import { Admin } from 'src/mongodb/schemas/admin.schema';
import { LoginAdminDto } from './dto';

@Injectable()
export class AuthAdminService {
  constructor(
    @InjectModel(ADMINS_MODEL_TEKEN) private readonly adminModel: Model<Admin>,
    private readonly adminService: AdminsService,
  ) {}

  async login(logingAdminDto: LoginAdminDto): Promise<any> {
    try {
      const { adminCode, password } = logingAdminDto;

      const admin = await this.adminService.findByAdminCode(adminCode);

      const isPasswordValid = await isPasswordMatched(password, admin.getHash);

      if (!isPasswordValid) throw new UnauthorizedException('invalid password');

      return admin;
    } catch (err) {
      throw err;
    }
  }

  async logout(): Promise<any> {
    return {
      message: 'Logout successfully',
    };
  }

  async refresh(): Promise<any> {
    return {
      message: 'Refresh successfully',
    };
  }
}
