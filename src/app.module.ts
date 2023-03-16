import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import * as Joi from '@hapi/joi';
import EmailService from './core/email/email.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, validationSchema: Joi.object({
        JWT_SECRECT_KEY: Joi.string().required(),
        TYPE_ORM_SSL: Joi.number().required(),
        TYPE_ORM_SYNCHORONIZE: Joi.number().required(),
        ENV: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
      })
    }),
    DatabaseModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
