import { Exclude } from 'class-transformer';
import { Roles } from 'src/common/enums';
import { Admin } from 'src/mongodb/schemas/admin.schema';

export class AdminEntity {
  private id: string;
  private isActive: boolean;
  private password: string;
  private adminCode: number;
  private userRef: string;
  private roles: Roles[];

  @Exclude()
  private hash: string;

  private hashRt: string;

  private bearerRt: string;

  constructor(adminData: Admin, password?: string) {
    this.init(adminData, password);
  }

  private init(adminData: Admin, password?: string): void {
    this.id = adminData.id;
    this.userRef = adminData.userRef;
    this.isActive = adminData.isActive;
    this.password = password && password;
    this.adminCode = adminData.adminCode;
    this.hash = adminData.hash;
    this.hashRt = adminData.hashRt;
    this.roles = [...adminData.roles];
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

  get getAdminCode(): number {
    return this.adminCode;
  }

  get getHash(): string {
    return this.hash;
  }

  get getHashRt(): string {
    return this.hashRt;
  }

  get getBearerRt(): string {
    return this.bearerRt;
  }

  get getRoles(): Roles[] {
    return [...this.roles];
  }

  setBearerRt(bearerRt: string) {
    this.bearerRt = bearerRt;
  }
}
