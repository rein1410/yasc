import { ApiPropertyOptional } from "@nestjs/swagger";
import { pUserPaginationDto } from "proto/users";


export class UserPaginationDto implements pUserPaginationDto {
  @ApiPropertyOptional()
  limit: number;

  @ApiPropertyOptional()
  skip: number;
}