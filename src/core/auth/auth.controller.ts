import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { LocalAuthGuard } from 'src/guards/auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { ChangePassRequestDTO } from './dto/change-pass.dto';
import { SignInRequestDTO } from './dto/signin.dto';
import { SignUpRequestDTO } from './dto/signup.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ description: 'Login system with username and password' })
  @ApiBody({ type: SignInRequestDTO })
  @Post('login')
  async login(@User() user) {
    return this.authService.login(user);
  }

  @ApiOperation({ description: 'Register account' })
  @ApiBody({ type: SignUpRequestDTO })
  @Post('register')
  async signUp(@Body() dto: SignUpRequestDTO) {
    return this.authService.register(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Get info user' })
  @Get('info')
  async info(@User() user) {
    return this.authService.info(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'Change password' })
  @Post('change-password')
  async changePassword(@User() user, @Body() dto: ChangePassRequestDTO) {
    return this.authService.changePassword(user, dto);
  }
}
