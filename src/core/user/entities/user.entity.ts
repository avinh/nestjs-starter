import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { Exclude } from 'class-transformer';
@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
    @Index()
    @Column({
        name: 'username',
        length: 100,
        nullable: false,
        unique: true,
    })
    username?: string;

    @Index()
    @Column({
        name: 'email',
        length: 100,
        nullable: false,
        unique: true,
    })
    email?: string;

    @Column({
        name: "pwd",
        length: 100,
        nullable: true,
        default: null,
    })
    @Exclude()
    pwd?: string;

    @Column('boolean', {
        name: 'activated',
        nullable: true,
        default: false,
    })
    activated?: boolean;

    @Column({ default: false })
    public isRegisteredWithGoogle: boolean;

    @Column({ default: false })
    public isEmailConfirmed: boolean;
}
