import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class EmailConfirmResendDTO {
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;
}
