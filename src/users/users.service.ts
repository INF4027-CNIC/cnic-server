import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CredentialsTaken, DefaultHttpException } from 'src/common/exceptions';
import { exceptionsCodes } from 'src/mongodb/enum';
import { User } from 'src/mongodb/schemas';
import { CreateUserDto } from './dto';
import { UserEntity } from './entities';
import { USER as USER_MODEL_TOKEN } from './users.costants';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER_MODEL_TOKEN) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const userData = {
      name: {
        first: createUserDto.firstname,
        last: createUserDto.lastname,
      },
      birth: {
        date: createUserDto.birthDate,
        place: createUserDto.birthPlace,
      },
      phone: createUserDto.phone,
      avatar: createUserDto.avatar,
      size: createUserDto.size,
      address: createUserDto.address,
      gender: createUserDto.gender,
      profession: createUserDto.profession,
      fathername: createUserDto.fathername,
      mothername: createUserDto.mothername,
    };

    try {
      const newUser = new this.userModel(userData);

      await newUser.save();

      return new UserEntity(newUser);
    } catch (err) {
      if (err.code === exceptionsCodes.duplicatePropertyValue)
        throw new CredentialsTaken();

      throw new DefaultHttpException();
    }
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
