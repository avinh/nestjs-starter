import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ChangePassRequestDTO {
  @IsString()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;

  @IsString()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  new_password: string;
}