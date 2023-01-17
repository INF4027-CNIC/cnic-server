import { SuperAdmin } from '../../mongodb/schemas';

export class SuperAdminEntity {
  private firstname: string;
  private lastname: string;
  private email: string;

  constructor(superAdminData: SuperAdmin) {
    this.init(superAdminData);
  }

  private init(superAdminData: SuperAdmin): void {
    this.firstname = superAdminData.firstname;
    this.lastname = superAdminData.lastname;
    this.email = superAdminData.email;
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
}
