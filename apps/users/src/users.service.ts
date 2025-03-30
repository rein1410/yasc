import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {  pCreateUserDto, pUserByEmail, pUserById, pUserPaginationDto, UsersServiceClient } from 'proto/users';
import { Observable } from 'rxjs';
import { User } from './schemas/user.schema';
import { Model, Query } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(request: pCreateUserDto): Promise<User> {
    return this.userModel.create(request);
  }
  async findOne(request: pUserById): Promise<User> {
    return this.userModel.findOne({ _id: request.id }).exec();
  }

  async findOneByEmail(request: pUserByEmail): Promise<User> {
    return this.userModel.findOne(request);
  }

  async find(request: pUserPaginationDto): Promise<User[]> {
    return this.userModel.find().skip(request.skip).limit(request.limit).exec();
  }
}
