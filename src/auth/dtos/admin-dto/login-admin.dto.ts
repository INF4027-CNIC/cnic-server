import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { MIN_PASSWORD } from '../../auth.constant';

export class LoginAdminDto {
  @ApiProperty({
    description: 'The fullname number of the user',
    example: 655951490,
    required: true,
  })
  @IsNumber()
  fullname: string;

  @ApiProperty({
    description: 'The password of the user',
    required: true,
    minimum: MIN_PASSWORD,
  })
  @IsString()
  @MinLength(MIN_PASSWORD)
  password: string;
}
