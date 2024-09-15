import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://nestjs:supersecret@localhost:27017/user?authSource=admin',
    ),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserDocument,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
