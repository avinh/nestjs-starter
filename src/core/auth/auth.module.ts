import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import environments from '../config/environments';

@Module({
  imports: [UserModule, PassportModule, DatabaseModule,
    JwtModule.register({
      secret: environments().JWT_SECRECT_KEY,
      signOptions: { expiresIn: '1d' },
    })],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
