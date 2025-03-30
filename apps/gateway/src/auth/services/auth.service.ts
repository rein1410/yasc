import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  USER_PACKAGE_NAME,
  USERS_SERVICE_NAME,
  UsersServiceClient,
} from 'proto/users';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private usersService: UsersServiceClient;

  constructor(@Inject(USER_PACKAGE_NAME) private usersClient: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.usersClient.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  async validateUser(body: LoginDto): Promise<any> {
    const { email, password } = body;
    const user = await lastValueFrom(
      this.usersService.findOneByEmail({ email }),
      { defaultValue: null },
    );
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async registerUser(body: RegisterDto): Promise<any> {
    return this.usersService.create(body);
  }
}
