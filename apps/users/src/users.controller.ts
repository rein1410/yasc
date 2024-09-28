import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { pCreateUserDto, pUser, pUserById, pUserPaginationDto, pUsers, UsersServiceController, UsersServiceControllerMethods } from 'proto/user';
import { Observable } from 'rxjs';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly userService: UsersService) {}

  async find(request: pUserPaginationDto): Promise<pUsers> {
    const users = await this.userService.find(request);
    return {
      data: users,
      total: users.length,
      skip: request.skip,
      limit: request.limit
    }
  }

  create(request: pCreateUserDto): Promise<pUser> | Observable<pUser> | pUser {
    return this.userService.create(request); 
  }

  findOne(request: pUserById): Promise<pUser> | Observable<pUser> | pUser {
    return this.userService.findOne(request);
  }

}
