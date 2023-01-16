import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tokens } from 'src/auth-admin/types';
import { SuperAdmin } from 'src/mongodb/schemas';
import { SUPER_ADMIN as SUPER_ADMIN_MODEL_TOKEN } from './auth-super-admin.contants';
import { LoginSuperAdminDto } from './dto';
import { JwtPayload } from './types';

@Injectable()
export class AuthSuperAdminService {
  constructor(
    @InjectModel(SUPER_ADMIN_MODEL_TOKEN)
    private readonly superAdminModel: Model<SuperAdmin>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginSuperAdminDto: LoginSuperAdminDto): Promise<any> {
    return loginSuperAdminDto;
    // try {
    //   const { email, password } = loginSuperAdminDto;
    //   const admin = await this.adminService.findByAdminCode(adminCode);
    //   const isPasswordValid = await isPasswordMatched(password, admin.getHash);
    //   if (!isPasswordValid) throw new UnauthorizedException('invalid password');
    //   const tokens = await this.generateToken(admin.getId, admin.getAdminCode);
    //   await this.updateRefreshToken(admin.getId, tokens.refresh_token);
    //   return tokens;
    // } catch (err) {
    //   throw err;
    // }
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

  private async generateToken(
    superAdminId: string,
    superAdminEmail: string,
  ): Promise<Tokens> {
    const payload: JwtPayload = {
      sub: superAdminId,
      email: superAdminEmail,
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
}
