import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from '../../../db/data-source';
import { DatabaseService } from './database.service';
import { UserEntity } from '../user/entities/user.entity';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([
      UserEntity
    ]),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule { }
