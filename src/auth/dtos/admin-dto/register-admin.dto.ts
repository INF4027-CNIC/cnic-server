import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { MIN_PASSWORD, MIN_USERNAME } from '../../auth.constant';

export class RegisterAdminDto {
  @ApiProperty({
    description: 'The username of the user',
    required: true,
    minimum: MIN_USERNAME,
    example: 'ngimdock',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_USERNAME)
  username: string;

  @ApiProperty({
    description: 'The phone number of the user',
    required: true,
    example: 655951490,
  })
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @ApiProperty({
    description: 'The password of the user',
    required: true,
    minimum: MIN_PASSWORD,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD)
  password: string;
}
