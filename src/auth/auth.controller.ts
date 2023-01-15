import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities';
import { AuthService } from './auth.service';
import { GetUser, PublicRoute } from './decorator';
import { LoginUserDto, RegisterAdminDto } from './dtos';
import { authController } from './enum';
import { JwtRefreshGuard } from './guards';
import { Tokens } from './types';

@Controller(authController.auth)
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @Post(authController.register)
  @ApiCreatedResponse({
    description: 'The user has been successfully registered.',
  })
  @ApiBadRequestResponse({ description: 'Incorrect DTO' })
  async registerAdmin(
    @Body() registerAdminDto: RegisterAdminDto,
  ): Promise<Tokens> {
    return this.authService.register(registerAdminDto);
  }

  @PublicRoute()
  @Post(authController.login)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The user has been successfully logged.',
  })
  @ApiBadRequestResponse({ description: 'Incorrect DTO' })
  async login(@Body() loginUserDto: LoginUserDto): Promise<Tokens> {
    return this.authService.login(loginUserDto);
  }

  @PublicRoute()
  @Post(authController.refreshToken)
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @ApiOkResponse({
    description: 'Refresh tokens has been generated successfully.',
  })
  @ApiForbiddenResponse({ description: 'Not authorized.' })
  async refreshToken(@GetUser() user: UserEntity) {
    return this.authService.refreshTokens(user.getId, user.getBearerRt);
  }

  @Post(authController.logout)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User has been logout successfully.',
  })
  @ApiForbiddenResponse({ description: 'Not authorized.' })
  async logout(@GetUser('id') userId: string) {
    return this.authService.logout(userId);
  }
}
