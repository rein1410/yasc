import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
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
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
