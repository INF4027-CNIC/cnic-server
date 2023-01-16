import { NotFoundException } from '@nestjs/common';

export class AdminNotFoundException extends NotFoundException {
  constructor() {
    super('Admin not found');
  }
}
