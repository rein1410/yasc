import { ApiProperty } from '@nestjs/swagger';
import { pRegisterDto } from 'proto/auth';

export class RegisterDto implements pRegisterDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}
