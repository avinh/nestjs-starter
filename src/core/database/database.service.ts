import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DBRepos } from './database.type';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    ) { }

    getRepos(altRepos?: DBRepos): DBRepos {
        return {
            userRepo: altRepos?.userRepo || this.userRepo,
        };
    }
}
