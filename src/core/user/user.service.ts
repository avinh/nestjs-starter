import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        private readonly databaseService: DatabaseService,
    ) { }

    async createWithGoogle(email: string, username: string) {
        const newUser = await this.databaseService.getRepos().userRepo.create({
            email,
            username,
            isRegisteredWithGoogle: true,
            isEmailConfirmed: true
        });
        await this.databaseService.getRepos().userRepo.save(newUser);
        return newUser;
    }

    async getByUsername(username: string): Promise<UserEntity | undefined> {
        return this.databaseService.getRepos().userRepo.findOne({
            where: {
                username: username
            }
        });
    }

    async getByEmail(email: string): Promise<UserEntity | undefined> {
        return this.databaseService.getRepos().userRepo.findOne({
            where: {
                email: email
            }
        });
    }
}
