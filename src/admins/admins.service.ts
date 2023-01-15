import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Admin } from 'src/mongodb/schemas/admin.schema';
import { UsersService } from 'src/users/users.service';
import { ADMIN as ADMIN_MODEL_TOKEN } from './admins.constant';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminEntity } from './entities/admin.entity';

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

    if (!user) throw new NotFoundException('The provided user is not found.');

    const newAdmin = new this.adminModel(createAdminDto);

    await newAdmin.save();
    console.log({ newAdmin });

    return new AdminEntity(newAdmin);
  }

  // async findAll(): Promise<AdminEntity[]> {}

  // async findOneById(): Promise<AdminEntity> {}

  // async findByName(): Promise<AdminEntity[]> {}
}
