import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The user that admin refert to',
  })
  userRef: string;
}
