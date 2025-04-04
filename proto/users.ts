// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.27.1
// source: proto/users.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface pUser {
  id: string;
  email: string;
  password: string;
  username: string;
  profilePicture: string;
}

export interface pUsers {
  data: pUser[];
  total: number;
  skip: number;
  limit: number;
}

export interface pUserPaginationDto {
  limit: number;
  skip: number;
}

export interface pCreateUserDto {
  email: string;
  username: string;
  password: string;
}

export interface pUserById {
  id: string;
}

export interface pUserByEmail {
  email: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UsersServiceClient {
  find(request: pUserPaginationDto): Observable<pUsers>;

  findOne(request: pUserById): Observable<pUser>;

  findOneByEmail(request: pUserByEmail): Observable<pUser>;

  create(request: pCreateUserDto): Observable<pUser>;
}

export interface UsersServiceController {
  find(request: pUserPaginationDto): Promise<pUsers> | Observable<pUsers> | pUsers;

  findOne(request: pUserById): Promise<pUser> | Observable<pUser> | pUser;

  findOneByEmail(request: pUserByEmail): Promise<pUser> | Observable<pUser> | pUser;

  create(request: pCreateUserDto): Promise<pUser> | Observable<pUser> | pUser;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["find", "findOne", "findOneByEmail", "create"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
