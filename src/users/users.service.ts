import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PublicationsService } from 'src/publications/publications.service';
import { CommentsService } from 'src/comments/comments.service';
import ObjectId = require('mongoose');

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private pubsService: PublicationsService,
    private commentService: CommentsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    createdUser.photo = JSON.parse(createUserDto.photo);
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
    //const user = await this.userModel.findOne({ _id : userId }).exec();
    const user = await this.userModel.findById(userId).exec();
    console.log(user);
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    let password;
    if (updateUserDto.password) {
      password = await bcrypt.hash(updateUserDto.password, 10);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    updateUserDto.password = password;
    try {
      const updatedUser = updateUserDto;
      // @ts-ignore
      updatedUser.photo = JSON.parse(updateUserDto.photo);
      const newUser = await this.userModel
        .findByIdAndUpdate(id, { ...password, ...updatedUser }, { new: true })
        .exec();
      return newUser;
    } catch (e) {
      throw new HttpException('Error updating profile', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string) {
    // const user = await this.findUserById(id);
    // const current = {
    //   _id: user._id,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   phone: user.phone,
    //   email: user.email,
    //   photo: user.photo,
    // };
    // console.log(current);
    await this.pubsService.deletePubsByUserId(id);
    await this.commentService.deleteCommentsByUserId(id);
    const result = await this.userModel.deleteOne({ _id: id });
    return result;
  }
}
