import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CredentialsTaken, DefaultHttpException } from 'src/common/exceptions';
import { tenYearsLater } from 'src/common/utils';
import { exceptionsCodes } from 'src/mongodb/enum';
import { User } from 'src/mongodb/schemas';
import { CreateUserDto } from './dto';
import { UpdateUserCodeDTO } from './dto/update-code.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
      cniInfos: {
        deliveryDate: createUserDto.cniDeliveryDate.toDateString(),
        expiryDate: tenYearsLater(createUserDto.cniDeliveryDate).toDateString()
      },
    };

    console.log({ userData });

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

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.find().exec();

    if (!users) throw new NotFoundException('No users found.');

    const usersList = users.map((user) => {
      const userData = {
        name: {
          first: user.name.first,
          last: user.name.last,
        },
        birth: {
          date: user.birth.date,
          place: user.birth.place,
        },
        phone: user.phone,
        avatar: user.avatar,
        size: user.size,
        address: user.address,
        gender: user.gender,
        profession: user.profession,
        fathername: user.fathername,
        mothername: user.mothername,

        cniInfos: {
          deliveryDate: user.cniInfos.deliveryDate,
          expiryDate: user.cniInfos.expiryDate,
          cniCode: user.cniInfos.cniCode,
        }
      };

      const retrievedUser = new UserEntity(new this.userModel(userData));

      return retrievedUser;
    });

    return usersList;
  }

  async findById(userId: string): Promise<any> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found.');
    return new UserEntity(user);
  }

  async findByCode(userCode: number): Promise<any> {
    const user = await this.userModel.findOne({ code: userCode });
    if (!user) throw new NotFoundException('User not found.');
    return new UserEntity(user);
  }

  async searchByName(username: string): Promise<any[]> {
    if (!username)
      throw new BadRequestException('The user names must be provided');

    try {
      if (username.indexOf(' ') !== -1) {
        const [firstname, lastname] = username.split(' ');

        const searchedUsers = await this.userModel
          .find({
            $or: [
              { name: { first: firstname, last: lastname } },
              { name: { first: lastname, last: firstname } },
            ],
          })
          .exec();

        if (!searchedUsers)
          throw new NotFoundException("The searched user doesn't exist");

        const usersList = searchedUsers.map((user) => {
          const userData = {
            name: {
              first: user.name.first,
              last: user.name.last,
            },
            birth: {
              date: user.birth.date,
              place: user.birth.place,
            },
            phone: user.phone,
            avatar: user.avatar,
            size: user.size,
            address: user.address,
            gender: user.gender,
            profession: user.profession,
            fathername: user.fathername,
            mothername: user.mothername,
          };

          const retrievedUser = new UserEntity(new this.userModel(userData));

          return retrievedUser;
        });

        return usersList;
      } else {
        console.log('passed here');
        console.log(username);

        const searchedUsers = await this.userModel
          .find({
            $or: [
              {
                'name.first': username,
              },
              {
                'name.last': username,
              },
            ],
          })
          .exec();

        if (!searchedUsers)
          throw new NotFoundException("The searched user doesn't exist");

        const usersList = searchedUsers.map((user) => {
          const userData = {
            name: {
              first: user.name.first,
              last: user.name.last,
            },
            birth: {
              date: user.birth.date,
              place: user.birth.place,
            },
            phone: user.phone,
            avatar: user.avatar,
            size: user.size,
            address: user.address,
            gender: user.gender,
            profession: user.profession,
            fathername: user.fathername,
            mothername: user.mothername,
          };

          const retrievedUser = new UserEntity(new this.userModel(userData));

          return retrievedUser;
        });

        return usersList;
      }
    } catch (error) {
      throw new Error('Oops something went wrong');
    }
    // const searchedUser = await this.userModel.find({
    //   username: { $regex: new RegExp(username), $options: 'i' },
    // });
    // if (!searchedUser) throw new NotFoundException('User not found.');
    // const results = [];
    // for (const user of searchedUser) {
    //   results.push(new UserEntity(user));
    // }
    // return results;
  }

  async isUserExist(userId: string) {
    const user = await this.userModel.findById<User>(userId);

    if (!user) return { data: false };

    return { data: true };
  }

  async updateById(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const userData = {
      name: {
        first: updateUserDto.firstname,
        last: updateUserDto.lastname,
      },
      birth: {
        date: updateUserDto.birthDate,
        place: updateUserDto.birthPlace,
      },
      phone: updateUserDto.phone,
      avatar: updateUserDto.avatar,
      size: updateUserDto.size,
      address: updateUserDto.address,
      gender: updateUserDto.gender,
      profession: updateUserDto.profession,
      fathername: updateUserDto.fathername,
      mothername: updateUserDto.mothername,
    };

    try {
      const searchedUser = await this.findById(userId);

      if (!searchedUser)
        throw new NotFoundException(
          `The user with identifier ${userId} doesn't exist`,
        );

      await this.userModel.updateOne(
        { _id: userId },
        {
          $set: {
            name: {
              first: userData.name.first,
              last: userData.name.last,
            },
            birth: {
              date: userData.birth.date,
              place: userData.birth.place,
            },
            phone: userData.phone,
            avatar: userData.avatar,
            size: userData.size,
            address: userData.address,
            gender: userData.gender,
            profession: userData.profession,
            fathername: userData.fathername,
            mothername: userData.mothername,
          },
        },
      );

      const modifiedUser = await this.findById(userId);

      const modifiedUserData = {
        name: {
          first: modifiedUser.getFistname,
          last: modifiedUser.getLastname,
        },
        birth: {
          date: modifiedUser.getBirthDate,
          place: modifiedUser.getBirthPlace,
        },
        phone: modifiedUser.getPhone,
        avatar: modifiedUser.getAvatar,
        size: modifiedUser.getSize,
        address: modifiedUser.getAdress,
        gender: modifiedUser.getGender,
        profession: modifiedUser.getProfession,
        fathername: modifiedUser.getFathername,
        mothername: modifiedUser.getMothername,
      };

      return new UserEntity(new this.userModel(modifiedUserData));
    } catch (e) {
      throw new BadRequestException(`Oops Something went wrong`);
    }
  }

  async updateUserCodeById(
    userId: string,
    userNewCode: UpdateUserCodeDTO,
  ): Promise<UserEntity> {
    const { newCode } = userNewCode;

    try {
      const searchedUser = await this.findById(userId);

      if (!searchedUser)
        throw new NotFoundException(
          `The user with identifier ${userId} doesn't exist`,
        );

      await this.userModel.updateOne(
        { _id: userId },
        {
          $set: {
            code: newCode,
          },
          $currentDate: { updatedAt: true },
        },
      );

      const modifiedUser = await this.findById(userId);

      const modifiedUserData = {
        name: {
          first: modifiedUser.getFistname,
          last: modifiedUser.getLastname,
        },
        birth: {
          date: modifiedUser.getBirthDate,
          place: modifiedUser.getBirthPlace,
        },
        phone: modifiedUser.getPhone,
        avatar: modifiedUser.getAvatar,
        size: modifiedUser.getSize,
        address: modifiedUser.getAdress,
        gender: modifiedUser.getGender,
        profession: modifiedUser.getProfession,
        fathername: modifiedUser.getFathername,
        mothername: modifiedUser.getMothername,
        code: modifiedUser.getCode,
      };

      return new UserEntity(new this.userModel(modifiedUserData));
    } catch (e) {
      throw new BadRequestException(`Oops Something went wrong`);
    }
  }

  async updateByCode(
    userCode: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const userData = {
      name: {
        first: updateUserDto.firstname,
        last: updateUserDto.lastname,
      },
      birth: {
        date: updateUserDto.birthDate,
        place: updateUserDto.birthPlace,
      },
      phone: updateUserDto.phone,
      avatar: updateUserDto.avatar,
      size: updateUserDto.size,
      address: updateUserDto.address,
      gender: updateUserDto.gender,
      profession: updateUserDto.profession,
      fathername: updateUserDto.fathername,
      mothername: updateUserDto.mothername,
    };

    try {
      const searchedUser = await this.findByCode(userCode);

      if (!searchedUser)
        throw new NotFoundException(
          `The user with Numeric code ${userCode} doesn't exist`,
        );

      await this.userModel.updateOne(
        { code: userCode },
        {
          $set: {
            name: {
              first: userData.name.first,
              last: userData.name.last,
            },
            birth: {
              date: userData.birth.date,
              place: userData.birth.place,
            },
            phone: userData.phone,
            avatar: userData.avatar,
            size: userData.size,
            address: userData.address,
            gender: userData.gender,
            profession: userData.profession,
            fathername: userData.fathername,
            mothername: userData.mothername,
          },
        },
      );

      const modifiedUser = await this.findByCode(userCode);

      const modifiedUserData = {
        name: {
          first: modifiedUser.getFistname,
          last: modifiedUser.getLastname,
        },
        birth: {
          date: modifiedUser.getBirthDate,
          place: modifiedUser.getBirthPlace,
        },
        phone: modifiedUser.getPhone,
        avatar: modifiedUser.getAvatar,
        size: modifiedUser.getSize,
        address: modifiedUser.getAdress,
        gender: modifiedUser.getGender,
        profession: modifiedUser.getProfession,
        fathername: modifiedUser.getFathername,
        mothername: modifiedUser.getMothername,
      };

      return new UserEntity(new this.userModel(modifiedUserData));
    } catch (e) {
      throw new BadRequestException(`Oops Something went wrong`);
    }
  }

  async delete(userId: string): Promise<void> {
    try {
      const searchedUser = await this.isUserExist(userId);

      if (!searchedUser)
        throw new NotFoundException(
          `The user with identifier ${userId} not found`,
        );

      await this.userModel.deleteOne({ _id: userId });
    } catch (e) {
      throw new BadRequestException('Oops somethin went wrong');
    }
  }
}
