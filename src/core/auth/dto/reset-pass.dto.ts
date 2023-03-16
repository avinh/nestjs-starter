import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordRequestDto {
  @IsString()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  token: string;

  @IsString()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;
}