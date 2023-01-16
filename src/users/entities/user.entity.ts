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
  private code: number;

  @ApiProperty()
  private birthDate: number;

  @ApiProperty()
  private birthPlace: string;

  @ApiProperty()
  private size: number;

  @ApiProperty()
  private gender: string;

  @ApiProperty()
  private profession: string;

  @ApiProperty()
  private address: string;

  @ApiProperty()
  private fathername: string;

  @ApiProperty()
  private mothername: string;

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
    this.code = userData.code;

    this.birthDate = userData.birth.date;
    this.birthPlace = userData.birth.place;
    this.size = userData.size;
    this.gender = userData.gender;
    this.profession = userData.profession;
    this.address = userData.address;

    this.fathername = userData.fathername;
    this.mothername = userData.mothername;

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

  get getCode(): number {
    return this.code;
  }

  get getBirthDate(): number {
    return this.birthDate;
  }

  get getBirthPlace(): string {
    return this.birthPlace;
  }

  get getSize(): number {
    return this.size;
  }

  get getGender(): string {
    return this.gender;
  }

  get getProfession(): string {
    return this.profession;
  }

  get getAdress(): string {
    return this.address;
  }

  get getFathername(): string {
    return this.fathername;
  }

  get getMothername(): string {
    return this.mothername;
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
