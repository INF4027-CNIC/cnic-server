import { Admin } from 'src/mongodb/schemas/admin.schema';

export class AdminEntity {
  private id: string;
  private userRef: string;
  private isActive: boolean;

  constructor(adminData: Admin) {
    this.init(adminData);
  }

  private init(adminData: Admin): void {
    this.id = adminData.id;
    this.userRef = adminData.userRef;
    this.isActive = adminData.isActive;
  }

  getId(): string {
    return this.id;
  }

  getUserRef(): string {
    return this.userRef;
  }

  getIsActive(): boolean {
    return this.isActive;
  }
}
