import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { DefaultHttpException } from 'src/common/exceptions';
import { generateUUID, hashPassword } from 'src/common/helpers';
import { exceptionsCodes } from 'src/mongodb/enum';
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
    try {
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
        .populate('userRef', 'id name code phone');

      return new AdminEntity(admin, adminPassword);
    } catch (err) {
      if (err.code === exceptionsCodes.duplicatePropertyValue)
        throw new BadRequestException(
          'Some given credentials are already taken by another admin, try agin',
        );

      throw new DefaultHttpException();
    }
  }

  async findAll(): Promise<AdminEntity[]> {
    try {
      const allAdmins = await this.adminModel
        .find()
        .populate('userRef', 'id name code phone');

      return allAdmins.map((admin) => new AdminEntity(admin));
    } catch (err) {
      throw new DefaultHttpException();
    }
  }

  async findOneById(adminId: string): Promise<AdminEntity> {
    try {
      // const foundAdmin = await this.adminModel
      //   .findOne({
      //     _id: adminId,
      //     isActive: true,
      //   })
      //   .populate('userRef', 'id name code phone');

      const foundAdmin = await this.adminModel
        .findById(adminId)
        .where({ isActive: true })
        .populate('userRef', 'id name code phone');

      if (!foundAdmin) throw new AdminNotFoundException();

      return new AdminEntity(foundAdmin);
    } catch (err) {
      throw err;
    }
  }

  async findByAdminCode(adminCode: number): Promise<AdminEntity> {
    try {
      const foundAdmin = await this.adminModel
        .findOne({
          adminCode: adminCode,
          isActive: true,
        })
        .populate('userRef', 'id name code phone');

      if (!foundAdmin) throw new AdminNotFoundException();

      return new AdminEntity(foundAdmin);
    } catch (err) {
      throw err;
    }
  }

  async adminExists(adminCode: number): Promise<boolean> {
    const admin = await this.adminModel.findOne({ adminCode: adminCode });

    return !!admin;
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
