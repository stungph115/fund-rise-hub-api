import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Follow } from './follow.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Follow]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
  ],
  controllers: [FollowController],
  providers: [FollowService]
})
export class FollowModule { }
