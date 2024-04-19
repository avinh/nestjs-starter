import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import IUser from 'src/interfaces/user.interface';
import { DatabaseService } from '../database/database.service';
import { ChangePassRequestDTO } from './dto/change-pass.dto';
import { SignUpRequestDTO } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async info(user) {
    if (!user) {
      throw new UnauthorizedException();
    }

    const userGet = await this.databaseService.getRepos().userRepo.findOne({
      where: {
        id: user.id,
      },
    });

    return {
      user: userGet,
    };
  }

  async changePassword(user, dto: ChangePassRequestDTO) {
    if (!user) {
      throw new UnauthorizedException();
    }

    const userCheck = await this.validateUser(user.username, dto.password);
    if (!userCheck) {
      throw new UnauthorizedException();
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.new_password, saltOrRounds);
    const userUpdate = await this.databaseService
      .getRepos()
      .userRepo.update(user.id, {
        pwd: hashedPassword,
      });

    if (!userUpdate.affected) {
      throw new NotAcceptableException('Update failed');
    }

    return { user };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.databaseService.getRepos().userRepo.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(pass, user.pwd);

    if (isMatch) {
      return user;
    }
    return null;
  }

  async login(user: IUser) {
    const userResult = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
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
        where: [{ email: dto.email }, { username: dto.username }],
      });

      if (check) {
        throw new NotAcceptableException('Registration failed');
      }

      const userUpdate = await this.databaseService.getRepos().userRepo.save({
        username: dto?.username,
        email: dto?.email,
        pwd: hashedPassword,
        lastLogin: new Date(),
      });

      const user = {
        id: userUpdate.id,
        username: userUpdate.username,
        email: userUpdate.email,
      };

      return {
        user,
        access_token: this.jwtService.sign(user),
      };
    } catch (error) {
      throw error;
    }
  }
}
