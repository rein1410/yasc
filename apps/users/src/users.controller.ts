import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { pCreateUserDto, pUser, pUserByEmail, pUserById, pUserPaginationDto, pUsers, UsersServiceController, UsersServiceControllerMethods } from 'proto/users';
import { Observable } from 'rxjs';
import { User } from './schemas/user.schema';
import { plainToInstance } from 'class-transformer';

@Controller()
@UsersServiceControllerMethods()
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController implements UsersServiceController {
  constructor(private readonly userService: UsersService) {}

  findOneByEmail(request: pUserByEmail): Promise<pUser> | Observable<pUser> | pUser {
    return this.userService.findOneByEmail(request);
  }

  async find(request: pUserPaginationDto): Promise<pUsers> {
    const users = await this.userService.find(request);
    return {
      data: plainToInstance(User, users),
      total: users.length,
      skip: request.skip === undefined ? 0 : request.skip,
      limit: request.limit === undefined ? 0 : request.limit
    }
  }

  create(request: pCreateUserDto): Promise<pUser> | Observable<pUser> | pUser {
    return this.userService.create(request); 
  }

  async findOne(request: pUserById): Promise<pUser> {
    const res = await this.userService.findOne(request);
    return plainToInstance(User, res);
  }

}
