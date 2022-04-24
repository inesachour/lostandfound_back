import { Model } from 'mongoose';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findOneByEmail(email: string): Promise<Model<User>> {
    return await this.userModel.findOne({ email: email });
  }

  async CheckVerified(email: string): Promise<Model<User>> {
    return await this.userModel.findOne({ email: email, verified: true });
  }

  async findUserById(userId: string) {
    console.log(userId);
    const user = await this.userModel.findOne({ _id: userId }).exec();
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const newUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();
      return newUser;
    } catch (e) {
      throw new HttpException('Error updating profile', HttpStatus.BAD_REQUEST);
    }
  }
}
