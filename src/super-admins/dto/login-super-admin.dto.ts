import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { MIN_PASSWORD } from '../super-admin.constant';

export class LoginAdminDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(MIN_PASSWORD)
  readonly password: string;
}
