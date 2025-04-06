import { Controller, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { pCreateUserDto, pUser, pUserByEmail, pUserById, pUsersList, UsersServiceController, UsersServiceControllerMethods } from 'proto/users';
import { Observable } from 'rxjs';
import { User } from './schemas/user.schema';
import { plainToInstance } from 'class-transformer';
import MongooseClassSerializerInterceptor from '@app/common/mongoose-class-serializer.interceptor';
import { PaginationDto } from 'apps/gateway/src/users/dto';

@Controller()
@UsersServiceControllerMethods()
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UsersController implements UsersServiceController {
  constructor(private readonly userService: UsersService) {}

  findOneByEmail(request: pUserByEmail): Promise<pUser> | Observable<pUser> | pUser {
    return this.userService.findOneByEmail(request);
  }

  async find(request: PaginationDto): Promise<pUsersList> {
    const users = await this.userService.find(request);
    return users;
  }

  create(request: pCreateUserDto): Promise<pUser> | Observable<pUser> | pUser {
    return this.userService.create(request); 
  }

  async findOne(request: pUserById): Promise<pUser> {
    const res = await this.userService.findOne(request);
    return plainToInstance(User, res);
  }

}
