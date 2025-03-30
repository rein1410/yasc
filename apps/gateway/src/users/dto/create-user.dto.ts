import { ApiProperty } from "@nestjs/swagger";
import { pCreateUserDto } from "proto/users";

export class CreateUserDto implements pCreateUserDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}
