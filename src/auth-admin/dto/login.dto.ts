import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginAdminDto {
  @IsNumber()
  @IsNotEmpty()
  adminCode: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
