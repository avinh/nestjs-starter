import { Body, Controller, Get, Param, Post, Req, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guards/auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { ChangePassRequestDTO } from './dto/change-pass.dto';
import { SignInRequestDTO } from './dto/signin.dto';
import { SignUpRequestDTO } from './dto/signup.dto';
import TokenVerificationDto from './dto/token-verification.dto';
import { GoogleAuthenticationService } from '../google-authentication/google-authentication.service';
import EmailService from '../email/email.service';
import ForgotPasswordRequestDto from './dto/forgot-password-request.dto';
import ForgotPasswordResetDto from './dto/forgot-password-reset.dto';
import { EmailConfirmResendDTO } from './dto/email-confirm-resend.dto';
import { ResetPasswordRequestDto } from './dto/reset-pass.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleAuthenticationService: GoogleAuthenticationService,

  ) { }

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ description: "Login with email and password" })
  @ApiBody({ type: SignInRequestDTO })
  @Post('login')
  async login(@User() user) {
    return this.authService.login(user);
  }

  @Post('login/google')
  @ApiOperation({ description: "Login with Google" })
  async authenticate(@Body() tokenData: TokenVerificationDto, @Req() request: Request) {
    return this.googleAuthenticationService.authenticate(tokenData.token);
  }

  @ApiOperation({ description: "Register account" })
  @ApiBody({ type: SignUpRequestDTO })
  @Post("register")
  async signUp(@Body() dto: SignUpRequestDTO) {
    return this.authService.register(dto);
  }

  @ApiOperation({ description: "Register resend email" })
  @Post("register/confirm/resend")
  @ApiBody({ type: EmailConfirmResendDTO })
  async signUpResend(@Body() dto: EmailConfirmResendDTO) {
    return this.authService.registerSendMailConfirm(dto.email);
  }

  @ApiOperation({ description: "Register confirm email" })
  @Post("register/confirm")
  @ApiBody({ type: TokenVerificationDto })
  async signUpConfirm(@Body() dto: TokenVerificationDto) {
    return this.authService.registerConfirm(dto.token);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: "Get info user" })
  @Get("info")
  async info(@User() user) {
    return this.authService.info(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: "Change password" })
  @Post("change-password")
  async changePassword(@User() user, @Body() dto: ChangePassRequestDTO) {
    return this.authService.changePassword(user, dto);
  }

  @ApiOperation({ description: "Forgot password - Request" })
  @Post("forgot-password/request")
  async requestForgotPassword(@Body() dto: ForgotPasswordRequestDto) {
    return this.authService.requestForgotPassword(dto.email);
  }

  @ApiOperation({ description: "Forgot password - Reset password" })
  @Post("forgot-password/reset")
  async resetForgotPassword(@Body() dto: ResetPasswordRequestDto) {
    return this.authService.resetForgotPassword(dto);
  }

}
