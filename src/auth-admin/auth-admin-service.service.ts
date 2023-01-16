import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ADMIN as ADMINS_MODEL_TEKEN } from 'src/admins/admins.constant';
import { AdminEntity } from 'src/admins/entities/admin.entity';
import { AdminNotFoundException } from 'src/admins/exceptions';
import { isPasswordMatched } from 'src/common/helpers';
import { Admin } from 'src/mongodb/schemas/admin.schema';
import { LoginAdminDto } from './dto';

@Injectable()
export class AuthAdminService {
  constructor(
    @InjectModel(ADMINS_MODEL_TEKEN) private readonly adminModel: Model<Admin>,
  ) {}

  async login(logingAdminDto: LoginAdminDto): Promise<any> {
    const { adminCode, password } = logingAdminDto;

    const admin = await this.adminModel
      .findOne({ code: adminCode })
      .populate('userRef');

    if (!admin) throw new AdminNotFoundException();

    const isPasswordValid = isPasswordMatched(password, admin.hash);

    if (!isPasswordValid) throw new UnauthorizedException();

    return new AdminEntity(admin);
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
