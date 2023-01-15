import { BadRequestException } from '@nestjs/common';

export class CredentialsTaken extends BadRequestException {
  constructor() {
    super(
      'the value of some properties provided are already taken by another user',
    );
  }
}
