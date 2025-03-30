import { ApiProperty } from "@nestjs/swagger";
import { pLoginDto } from "proto/auth";

export class LoginDto implements pLoginDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
