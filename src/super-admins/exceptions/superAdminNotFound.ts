import { NotFoundException } from '@nestjs/common';

export class SuperAdminNotFoundException extends NotFoundException {
  constructor(private superAdminId: string) {
    super(`Super admin #${superAdminId} not found`);
  }
}
