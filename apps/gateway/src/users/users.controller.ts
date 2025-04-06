import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  Inject,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  USER_PACKAGE_NAME,
  USERS_SERVICE_NAME,
  UsersServiceClient,
} from 'proto/users';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserDto, PaginationDto, SortOption, UpdateUserDto } from './dto';
import { map } from 'rxjs';
import { pPaginationRequest } from 'proto/common';

@Controller('users')
@ApiTags('users')
export class UsersController implements OnModuleInit {
  private usersService: UsersServiceClient;

  constructor(@Inject(USER_PACKAGE_NAME) private usersClient: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.usersClient.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async find(@Query() dto: PaginationDto) {
    return this.usersService.find(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.usersService.remove(+id);
  }
}
