import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    description: 'The admin code',
  })
  @IsNumber()
  @IsNotEmpty()
  adminCode: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The admin password',
  })
  password: string;
}
