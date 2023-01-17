import { Exclude } from 'class-transformer';
import { SuperAdmin } from '../../mongodb/schemas';

export class SuperAdminEntity {
  private id: string;
  private firstname: string;
  private lastname: string;
  private email: string;
  private hashRt: string;

  @Exclude()
  private password: string;

  constructor(superAdminData: SuperAdmin) {
    this.init(superAdminData);
  }

  private init(superAdminData: SuperAdmin): void {
    this.id = superAdminData.id;
    this.firstname = superAdminData.firstname;
    this.lastname = superAdminData.lastname;
    this.email = superAdminData.email;
    this.password = superAdminData.password;
    this.hashRt = superAdminData.hashRt;
  }

  get getId(): string {
    return this.id;
  }

  get getFirtname(): string {
    return this.firstname;
  }

  get getLastname(): string {
    return this.lastname;
  }

  get getEmail(): string {
    return this.email;
  }

  get getPassword(): string {
    return this.password;
  }

  get getHashRt(): string {
    return this.hashRt;
  }
}
