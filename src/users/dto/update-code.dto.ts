import { IsNumber } from 'class-validator';

export class UpdateUserCodeDTO {
  @IsNumber()
  readonly newCode: number;
}
