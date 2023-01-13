import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from 'src/mongodb/schemas';

export class UserEntity {
  @ApiProperty()
  private id: string;

  @ApiProperty()
  private firstname: string;

  @ApiProperty()
  private lastname: string;

  @ApiProperty()
  private fullname: string;

  @ApiProperty()
  private phone: number;

  @ApiProperty()
  private avatar: string;

  @ApiProperty()
  private createdAt: Date;

  @ApiProperty()
  private updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  private hash: string;

  @Exclude({ toPlainOnly: true })
  private hashRt: string;

  @Exclude({ toPlainOnly: true })
  private bearerRefreshToken: string;

  constructor(userData: User) {
    this.init(userData);
  }

  init(userData: User) {
    this.id = userData.id;
    this.firstname = userData.name.first;
    this.lastname = userData.name.last;
    this.phone = userData.phone;
    this.avatar = userData.avatar;

    this.fullname = userData.fullname;

    this.createdAt = userData.metadata.createdAt;
    this.updatedAt = userData.metadata.updatedAt;

    this.hash = userData.hash;
    this.hashRt = userData.hashRt;
  }

  get getDatas() {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      fullname: this.fullname,
      phone: this.phone,
      avatar: this.avatar,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      hash: this.hash,
      hashRt: this.hashRt,
    };
  }

  get getId() {
    return this.id;
  }

  get getFistname() {
    return this.firstname;
  }

  get getLastname() {
    return this.lastname;
  }

  get getPhone() {
    return this.phone;
  }

  get getAvatar() {
    return this.avatar;
  }

  get getCreatedAt() {
    return this.createdAt;
  }

  get getUpdatedAt() {
    return this.updatedAt;
  }

  get getHash() {
    return this.hash;
  }

  get getHashRt() {
    return this.hashRt;
  }

  get getBearerRt(): string {
    return this.bearerRefreshToken;
  }

  setBearerRefreshToken(bearerToken: string): void {
    this.bearerRefreshToken = bearerToken;
  }
}
