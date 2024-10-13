import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { pUser } from 'proto/user';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true
})
export class User implements pUser {

  @Expose()
  id: string;

  @Prop()
  @Expose()
  email: string;


  @Prop()
  @Expose()
  profilePicture: string;

  @Prop()
  @Expose()
  username: string;

  @Prop()
  @Exclude()
  password: string;
}

export const UserDocument = SchemaFactory.createForClass(User);