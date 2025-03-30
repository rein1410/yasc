import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { USERS_SERVICE_NAME, UsersServiceClient } from 'proto/users';

@Injectable()
export class AuthService {
  private usersService: UsersServiceClient;

  constructor(@Inject('USER_PACKAGE') private usersClient: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.usersClient.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  async validateUser(email: string, password: string): Promise<any> {
    return this.usersService
      .findOneByEmail({ email })
      .subscribe((user) => {
        if (user && user.password === password) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      });
  }
}

