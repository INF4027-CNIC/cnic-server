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
  readonly firstname: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: number;

  @IsString()
  @IsNotEmpty()
  readonly avatar: string;

  @IsNumber()
  @IsNotEmpty()
  readonly birthDate: number;

  @IsString()
  @IsNotEmpty()
  readonly birthPlace: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(4)
  readonly size: number;

  @IsIn(['male', 'female'])
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  readonly profession: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  readonly fathername: string;

  @IsString()
  @IsNotEmpty()
  readonly mothername: string;
}
