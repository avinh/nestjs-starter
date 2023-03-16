import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ForgotPasswordRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  email: string;
}

export default ForgotPasswordRequestDto;