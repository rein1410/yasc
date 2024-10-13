import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument } from '../../users/src/schemas/user.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { protobufPackage } from 'proto/user';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: protobufPackage,
          protoPath: join(__dirname, '../../../proto/user.proto'),
          url: '0.0.0.0:3002',
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
