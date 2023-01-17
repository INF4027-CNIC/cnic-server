import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { IsPhoneNumber } from '../../common/validators';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The firstname of the user.',
  })
  readonly firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The lastname of the user.',
  })
  readonly lastname: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'The phone number of the user.',
  })
  readonly phone: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The path to the user avater image.',
  })
  readonly avatar: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'The birth date of the user.',
  })
  readonly birthDate: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The birth place of the user.',
  })
  readonly birthPlace: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(4)
  @ApiProperty({
    type: Number,
    description: 'The height of the user.',
  })
  readonly size: number;

  @IsIn(['male', 'female'])
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The user gender.',
  })
  gender: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({
    type: String,
    description: 'The profession of the user.',
  })
  readonly profession: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({
    type: String,
    description: 'The address of the user.',
  })
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "The user father's name.",
  })
  readonly fathername: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "The user mothers's name.",
  })
  readonly mothername: string;
}
