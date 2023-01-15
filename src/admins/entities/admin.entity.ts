import { Admin } from 'src/mongodb/schemas/admin.schema';

export class AdminEntity {
  private id: string;
  private isActive: boolean;
  private password: string;
  private userRef: string;
  private hash: string;
  constructor(adminData: Admin, password?: string) {
    this.init(adminData, password);
  }

  private init(adminData: Admin, password?: string): void {
    this.id = adminData.id;
    this.userRef = adminData.userRef;
    this.isActive = adminData.isActive;
    this.password = password && password;
    this.hash = adminData.hash;
  }

  get getId(): string {
    return this.id;
  }

  get getUserRef(): string {
    return this.userRef;
  }

  get getIsActive(): boolean {
    return this.isActive;
  }

  get getPassword(): string {
    return this.password;
  }

  get getHash(): string {
    return this.hash;
  }
}
