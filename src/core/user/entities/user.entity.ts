import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
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

  @Column({
    name: 'pwd',
    length: 100,
    nullable: true,
    default: null,
    select: false,
  })
  pwd?: string;

  @Column({
    name: 'email',
    length: 100,
    nullable: false,
    unique: true,
  })
  email?: string;

  @Column('boolean', {
    name: 'activated',
    nullable: true,
    default: false,
  })
  activated?: boolean;
}
