import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @IsDateString()
  @IsNotEmpty()
  readonly birthDate: Date;

  @IsString()
  @IsNotEmpty()
  readonly birthPlace: string;
}
