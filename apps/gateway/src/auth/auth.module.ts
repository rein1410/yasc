import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { protobufPackage, USER_PACKAGE_NAME } from 'proto/users';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';

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
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
