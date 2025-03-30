import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protobufPackage, USER_PACKAGE_NAME } from 'proto/users';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: protobufPackage,
          protoPath: join(__dirname, '../../../proto/users.proto'),
          url: process.env.USERS_URL || '0.0.0.0:3001',
        },
      },
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
