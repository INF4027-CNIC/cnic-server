import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { generateUUID, hashPassword } from 'src/common/helpers';
import { Admin } from 'src/mongodb/schemas/admin.schema';
import { UserNotFoundException } from 'src/users/exceptions/user-not-fount';
import { UsersService } from 'src/users/users.service';
import { ADMIN as ADMIN_MODEL_TOKEN } from './admins.constant';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminEntity } from './entities/admin.entity';
import { AdminNotFoundException } from './exceptions';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(ADMIN_MODEL_TOKEN) private readonly adminModel: Model<Admin>,
    private readonly userService: UsersService,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<AdminEntity> {
    const { userRef: userRefId } = createAdminDto;

    if (!mongoose.Types.ObjectId.isValid(userRefId))
      throw new BadRequestException(
        "To create and admin account, you must provide he's correct user id",
      );

    const user = await this.userService.findById(userRefId);

    if (!user) throw new UserNotFoundException();

    const adminPassword = generateUUID();

    const hash = await hashPassword(adminPassword);

    const newAdmin = new this.adminModel({ ...createAdminDto, hash });

    await newAdmin.save();

    const admin = await this.adminModel
      .findById(newAdmin.id)
      .populate('userRef');

    return new AdminEntity(admin, adminPassword);
  }

  async findAll(): Promise<AdminEntity[]> {
    const allAdmins = await this.adminModel.find().populate('userRef');

    return allAdmins.map((admin) => new AdminEntity(admin));
  }

  async findOneById(adminId: string): Promise<AdminEntity> {
    const admin = await this.adminModel.findById(adminId).populate('userRef');

    if (!admin) throw new AdminNotFoundException();

    return new AdminEntity(admin);
  }

  async findByName(name: string): Promise<AdminEntity[]> {
    const admins = await this.adminModel
      .find({
        firstname: { $regex: new RegExp(name), $options: 'i' },
        lastname: { $regex: new RegExp(name), $options: 'i' },
      })
      .populate('userRef');

    return admins.map((admin) => new AdminEntity(admin));
  }
}
