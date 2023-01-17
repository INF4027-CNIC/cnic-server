import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tokens } from 'src/auth-admin/types';
import { SuperAdmin } from 'src/mongodb/schemas';
import { SuperAdminsService } from 'src/super-admins/super-admins.service';
import { SUPER_ADMIN as SUPER_ADMIN_MODEL_TOKEN } from './auth-super-admin.contants';
import { LoginSuperAdminDto } from './dto';
import { JwtPayload } from './types';
import * as argon from 'argon2';
import { SuperAdminEntity } from 'src/super-admins/entities';

@Injectable()
export class AuthSuperAdminService {
  constructor(
    @InjectModel(SUPER_ADMIN_MODEL_TOKEN)
    private readonly superAdminModel: Model<SuperAdmin>,
    private readonly superAdminService: SuperAdminsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginSuperAdminDto: LoginSuperAdminDto): Promise<Tokens> {
    try {
      const { email, password } = loginSuperAdminDto;

      const superAdmin = await this.superAdminService.findOneByEmail(email);

      if (password !== superAdmin.getPassword)
        throw new UnauthorizedException('invalid password');

      const tokens = await this.generateToken(
        superAdmin.getId,
        superAdmin.getEmail,
      );

      await this.updateRefreshToken(superAdmin.getId, tokens.refresh_token);

      return tokens;
    } catch (err) {
      throw err;
    }
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

  async jwtValidateSuperAdmin(superAdminId: string): Promise<SuperAdminEntity> {
    const superAdmin = await this.superAdminService.findOneById(superAdminId);

    console.log({ superAdmin });

    if (!superAdmin || !superAdmin.getHashRt) return null;

    return superAdmin;
  }

  async jwtRefreshValidateSuperAdmin(
    superAdminId: string,
    bearerRt: string,
  ): Promise<SuperAdminEntity> {
    const superAdmin = await this.superAdminService.findOneById(superAdminId);

    if (!superAdmin || !superAdmin.getHashRt) return null;

    const isRtMatched = await argon.verify(superAdmin.getHashRt, bearerRt);

    if (!isRtMatched) return null;

    return superAdmin;
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

  private async updateRefreshToken(
    superAdminId: string,
    refreshToken: string,
  ): Promise<void> {
    let hashRt = '';

    if (refreshToken) hashRt = await argon.hash(refreshToken);

    const superAdmin = await this.superAdminModel.findById(superAdminId);

    superAdmin.hashRt = hashRt;

    await superAdmin.save();
  }
}
