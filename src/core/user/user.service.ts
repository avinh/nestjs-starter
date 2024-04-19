import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  async info(user) {
    if (!user) {
      return {
        status: false,
      };
    }
    return {
      status: true,
      user,
    };
  }
  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.databaseService.getRepos().userRepo.findOne({
      where: {
        username: username,
      },
    });
  }
}
