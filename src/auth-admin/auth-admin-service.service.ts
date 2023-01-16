import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ADMIN as ADMINS_MODEL_TEKEN } from 'src/admins/admins.constant';
import { AdminsService } from 'src/admins/admins.service';
import { isPasswordMatched } from 'src/common/helpers';
import { Admin } from 'src/mongodb/schemas/admin.schema';
import { LoginAdminDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthAdminService {
  constructor(
    @InjectModel(ADMINS_MODEL_TEKEN) private readonly adminModel: Model<Admin>,
    private readonly adminService: AdminsService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(logingAdminDto: LoginAdminDto): Promise<any> {
    try {
      const { adminCode, password } = logingAdminDto;

      const admin = await this.adminService.findByAdminCode(adminCode);

      const isPasswordValid = await isPasswordMatched(password, admin.getHash);

      if (!isPasswordValid) throw new UnauthorizedException('invalid password');

      const tokens = await this.generateToken(admin.getId, admin.getAdminCode);

      await this.updateRefreshToken(admin.getId, tokens.refresh_token);

      return tokens;
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

  private async generateToken(
    adminId: string,
    adminCode: number,
  ): Promise<Tokens> {
    const payload: JwtPayload = {
      sub: adminId,
      adminCode,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_ACCESS_TOKEN'),
        expiresIn: '3d',
      }),

      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_TOKEN'),
        expiresIn: '7d',
      }),
    ]);

    return { access_token, refresh_token };
  }

  private async updateRefreshToken(
    adminId: string,
    refreshToken: string,
  ): Promise<void> {
    let hashRt = '';

    if (refreshToken) hashRt = await argon.hash(refreshToken);

    const foundAdmin = await this.adminModel.findById(adminId);

    foundAdmin.hashRt = hashRt;

    await foundAdmin.save();
  }
}
