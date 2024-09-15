import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true
})
export class User {
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