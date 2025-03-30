import { Controller, Get, Post, Body, Patch, Param, Delete, OnModuleInit, Inject, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { USERS_SERVICE_NAME, UsersServiceClient } from 'proto/users';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto, UserPaginationDto } from './dto';
import { User } from 'apps/users/src/schemas/user.schema';
import { map } from 'rxjs';

@Controller('users')
@ApiTags('users')
export class UsersController implements OnModuleInit{
  private  usersService: UsersServiceClient;

  constructor(@Inject("USER_PACKAGE") private usersClient: ClientGrpc) {}

  onModuleInit() {
    this.usersService = this.usersClient.getService<UsersServiceClient>(
      USERS_SERVICE_NAME
    );
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async find(@Query() dto: UserPaginationDto) {
    return this.usersService.find(dto).pipe(
      map(v => {
        if (v.data === undefined) v.data = [];
        return v
      })
    )
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
