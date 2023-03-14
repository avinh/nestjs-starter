import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService]
})

export class UserModule { }
