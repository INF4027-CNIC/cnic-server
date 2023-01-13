import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/mongodb/schemas';
import { LoginUserDto, RegisterAdminDto } from './dtos';
import * as argon from 'argon2';
import { JwtPayload, Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { USER as USER_MODEL_TOKEN } from 'src/users/users.costants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(USER_MODEL_TOKEN) private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerAdminDto: RegisterAdminDto): Promise<Tokens> {
    try {
      const hash = await argon.hash(registerAdminDto.password);

      delete registerAdminDto.password;

      const newUser = new this.userModel({
        ...registerAdminDto,
        hash,
      });

      const user = await newUser.save();

      const tokens = await this.generateToken(user.id, user.fullname);

      await this.updateRefreshToken(user.id, tokens.refresh_token);

      return tokens;
    } catch (err) {
      if (err.code === 11000)
        throw new ForbiddenException(
          'user with the givent credentials already exists.',
        );

      throw err;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.userModel.findOne({ phone: loginUserDto.phone });

      if (!user)
        throw new NotFoundException(
          'User whit the given phone number is not found.',
        );

      const isPasswordValid = await argon.verify(
        user.hash,
        loginUserDto.password,
      );

      if (!isPasswordValid) throw new NotFoundException('Wrong password');

      const tokens = await this.generateToken(user.id, user.fullname);

      await this.updateRefreshToken(user.id, tokens.refresh_token);

      return tokens;
    } catch (err) {
      throw err;
    }
  }

  async refreshTokens(userId: string, bearerRt: string): Promise<Tokens> {
    const user = await this.userModel.findById(userId);

    const isRtValid = await argon.verify(user.hashRt, bearerRt);

    if (!isRtValid)
      throw new ForbiddenException('Acces denied to refresh your token.');

    const tokens = await this.generateToken(user.id, user.fullname);

    await this.updateRefreshToken(userId, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string) {
    await this.updateRefreshToken(userId, '');
  }

  async jwtValidateUser(userId: string) {
    const user = await this.userModel.findById<User>(userId);

    if (!user || !user.hashRt) return null;

    return user;
  }

  async jwtRefreshValidateUser(userId: string, bearerRt: string) {
    const user = await this.userModel.findById<User>(userId);

    if (!user || !user.hashRt) return null;

    const isRtMatched = await argon.verify(user.hashRt, bearerRt);

    if (!isRtMatched) return null;

    return user;
  }

  private async generateToken(
    userId: string,
    fullname: string,
  ): Promise<Tokens> {
    const payload: JwtPayload = {
      sub: userId,
      fullname,
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

  private async updateRefreshToken(userId: string, refreshToken: string) {
    let hashRt = '';

    if (refreshToken) hashRt = await argon.hash(refreshToken);

    await this.userModel.findByIdAndUpdate(userId, {
      hashRt,
    });
  }
}
