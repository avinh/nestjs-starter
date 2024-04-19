import { ApiProperty } from '@nestjs/swagger';

export class InfoRequestDTO {
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;
}
