import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ForgotPasswordResetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;

  @IsString()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  new_password: string;
}

export default ForgotPasswordResetDto;