import { PaginationService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { pPaginationRequest } from 'proto/common';
import { pCreateUserDto, pUserByEmail, pUserById, pUsersList } from 'proto/users';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>,
private paginationService: PaginationService) {}

  async create(request: pCreateUserDto): Promise<User> {
    return this.userModel.create(request);
  }
  async findOne(request: pUserById): Promise<User> {
    return this.userModel.findOne({ _id: request.id }).exec();
  }

  async findOneByEmail(request: pUserByEmail): Promise<User> {
    const entity = await this.userModel.findOne(request).exec();
    return entity;
  }

  async find(request: pPaginationRequest): Promise<pUsersList> {
    const res = await this.paginationService.findAllAndCount(
      this.userModel,
      request,
    );
    return res;
  }
}
