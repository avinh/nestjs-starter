import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
export type DBRepos = {
    userRepo?: Repository<UserEntity>;
};
