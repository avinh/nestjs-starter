import { ApiProperty } from '@nestjs/swagger';

export class SignInRequestDTO {
  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  password: string;
}
