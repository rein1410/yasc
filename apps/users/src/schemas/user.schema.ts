import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { pUser } from 'proto/users';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true
})
export class User implements pUser {

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

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