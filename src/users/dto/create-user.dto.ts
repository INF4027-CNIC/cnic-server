import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
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

  // @IsDateString()
  // @IsNotEmpty()
  // readonly birthDate: Date;

  // @IsString()
  // @IsNotEmpty()
  // readonly birthPlace: string;
}
