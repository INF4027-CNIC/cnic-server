import { IsNotEmpty, IsString } from 'class-validator';

export class LoginSuperAdminDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
