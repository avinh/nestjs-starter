import { Injectable, NotAcceptableException, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import IUser from 'src/interfaces/user.interface';
import { ChangePassRequestDTO } from './dto/change-pass.dto';
import { SignUpRequestDTO } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import EmailService from '../email/email.service';
import environments from 'src/config/environments';
import { ResetPasswordRequestDto } from './dto/reset-pass.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService
  ) { }

  async info(user) {
    if (!user) {
      throw new UnauthorizedException();
    }

    const userGet = await this.databaseService.getRepos().userRepo.findOne({
      where: {
        id: user.id
      }
    });

    const { pwd, ...result } = userGet;
    return {
      user: result
    }
  }

  async changePassword(user, dto: ChangePassRequestDTO) {
    if (!user) {
      throw new UnauthorizedException();
    }

    const userCheck = await this.validateUser(user.email, dto.password);
    if (!userCheck) {
      throw new UnauthorizedException();
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.new_password, saltOrRounds);
    const userUpdate = await this.databaseService.getRepos().userRepo.update(user.id, {
      pwd: hashedPassword
    });

    if (!userUpdate.affected) {
      throw new NotAcceptableException("Update failed")
    }

    return { user };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.databaseService.getRepos().userRepo.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new UnauthorizedException()
    }

    const isMatch = await bcrypt.compare(pass, user.pwd);

    if (isMatch) {
      const { pwd, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: IUser) {
    const userResult = { id: user.id, username: user.username, email: user.email };
    return {
      user: user,
      access_token: this.jwtService.sign(userResult),
    };
  }

  async register(dto: SignUpRequestDTO) {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds);

      const check = await this.databaseService.getRepos().userRepo.findOne({
        where: [
          { email: dto.email },
          { username: dto.username }
        ]
      })

      if (check) {
        throw new NotAcceptableException("Registration failed")
      }

      const userUpdate = await this.databaseService.getRepos().userRepo.save({
        username: dto?.username,
        email: dto?.email,
        pwd: hashedPassword,
        lastLogin: new Date(),
      });

      const user = { id: userUpdate.id, username: userUpdate.username, email: userUpdate.email };

      this.registerSendMailConfirm(userUpdate.email);

      return {
        user,
        access_token: this.jwtService.sign(user),
      };
    } catch (error) {
      throw error
    }
  }

  async requestForgotPassword(email: string) {
    const token = this.jwtService.sign({ email, type: 'reset-pass' }, {
      secret: environments().JWT_VERIFICATION_TOKEN_SECRET,
      expiresIn: environments().JWT_VERIFICATION_TOKEN_EXPIRATION_TIME
    });

    const url = `${environments().EMAIL_CONFIRMATION_URL}?token=${token}`;

    const text = `Welcome to the application. To confirm the reset password, click here: ${url}`;

    var mainOptions = {
      from: 'Checknet',
      to: email,
      subject: 'Checknet - Set new password',
      text: text,
    }

    this.emailService.sendMail(mainOptions)
  }

  async registerSendMailConfirm(email: string) {
    const token = this.jwtService.sign({ email, type: 'confirm' }, {
      secret: environments().JWT_VERIFICATION_TOKEN_SECRET,
      expiresIn: environments().JWT_VERIFICATION_TOKEN_EXPIRATION_TIME
    });

    const url = `${environments().EMAIL_CONFIRMATION_URL}?token=${token}`;

    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    var mainOptions = {
      from: 'Checknet',
      to: email,
      subject: 'Checknet - confirm email',
      text: text,
    }

    this.emailService.sendMail(mainOptions)
  }

  async registerConfirm(token: string) {
    const payload = await this.jwtService.verify(token, {
      secret: environments().JWT_VERIFICATION_TOKEN_SECRET,
    });

    const checkMail = await this.databaseService.getRepos().userRepo.findOne({
      where: {
        email: payload.email
      }
    })

    if (checkMail.isEmailConfirmed) {
      throw new NotImplementedException()
    }

    if (payload.type !== 'confirm' || !checkMail) {
      throw new UnauthorizedException("Token invalid");
    }

    const user = await this.databaseService.getRepos().userRepo.findOne({
      where: {
        email: payload.email
      }
    });

    if (!user) {
      throw new UnauthorizedException()
    }


    const userUpdate = await this.databaseService.getRepos().userRepo.update(user.id, {
      isEmailConfirmed: true
    });

    if (!userUpdate.affected) {
      throw new NotAcceptableException("Update failed")
    }
    return { user };
  }

  async resetForgotPassword(dto: ResetPasswordRequestDto) {
    try {
      const payload = await this.jwtService.verify(dto.token, {
        secret: environments().JWT_VERIFICATION_TOKEN_SECRET,
      });

      const checkMail = await this.databaseService.getRepos().userRepo.findOne({
        where: {
          email: payload.email
        }
      })

      if (payload.type !== 'reset-pass' || !checkMail) {
        throw new UnauthorizedException("Token invalid");
      }

      const user = await this.databaseService.getRepos().userRepo.findOne({
        where: {
          email: payload.email
        }
      });

      if (!user) {
        throw new UnauthorizedException()
      }

      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds);
      const userUpdate = await this.databaseService.getRepos().userRepo.update(user.id, {
        pwd: hashedPassword
      });

      if (!userUpdate.affected) {
        throw new NotAcceptableException("Update failed")
      }

      return { user };
    } catch (error) {
      throw new UnauthorizedException("Token invalid");
    }
  }
}
