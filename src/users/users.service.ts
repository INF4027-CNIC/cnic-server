import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/mongodb/schemas';
import { CreateUserDto } from './dto';
import { USER as USER_MODEL_TOKEN } from './users.costants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER_MODEL_TOKEN) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    return createUserDto;
  }

  async findAll() {
    return {
      message: 'retrieve all users',
    };
  }

  async findById(userId: string): Promise<any> {
    // const user = await this.userModel.findById(userId);
    // if (!user) throw new NotFoundException('User not foud.');
    // return new UserEntity(user);

    return {
      message: `findUser with id ${userId}`,
    };
  }

  async findByCode(userCode: number): Promise<any> {
    return {
      message: `findUser with code ${userCode}`,
    };
  }

  async searchByName(username: string): Promise<any[]> {
    // const searchedUser = await this.userModel.find({
    //   username: { $regex: new RegExp(username), $options: 'i' },
    // });
    // if (!searchedUser) throw new NotFoundException('User not found.');
    // const results = [];
    // for (const user of searchedUser) {
    //   results.push(new UserEntity(user));
    // }
    // return results;

    return [
      {
        user1: username,
      },
      {
        user2: 'user2',
      },
    ];
  }

  async isUserExist(userId: string) {
    // const user = await this.userModel.findById<User>(userId);

    // if (!user) return { data: false };

    // return { data: true };

    return {
      message: `check user exist id ${userId}`,
    };
  }
}
