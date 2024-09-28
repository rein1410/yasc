import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { pUser } from 'proto/user';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true
})
export class User implements pUser {
  id: string;

  @Prop()
  email: string;

  @Prop()
  profilePicture: string;

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UserDocument = SchemaFactory.createForClass(User);