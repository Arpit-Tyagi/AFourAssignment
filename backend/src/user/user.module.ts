import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Expenses } from './user.expenses';

@Module({
  imports :[ 
    TypeOrmModule.forFeature([User, Category, Expenses])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
