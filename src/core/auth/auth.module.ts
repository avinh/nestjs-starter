import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import environments from 'src/config/environments';
import { GoogleAuthenticationService } from '../google-authentication/google-authentication.service';
import EmailService from '../email/email.service';

@Module({
  imports: [UserModule, PassportModule, DatabaseModule,
    JwtModule.register({
      secret: environments().JWT_SECRECT_KEY,
      signOptions: { expiresIn: '1d' },
    })],
  providers: [AuthService, LocalStrategy, GoogleAuthenticationService, EmailService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
