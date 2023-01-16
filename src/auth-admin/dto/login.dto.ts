import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @IsString()
  @IsNotEmpty()
  adminCode: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
