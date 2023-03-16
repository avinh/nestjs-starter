import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TokenVerificationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  token: string;
}

export default TokenVerificationDto;