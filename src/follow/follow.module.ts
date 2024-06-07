import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Follow } from './follow.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'env';
import { NotificationService } from 'src/notification/notification.service';
import { Notification } from 'src/notification/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Follow, Notification]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: env.USER_JWT_KEY,
      signOptions: {
        expiresIn: "48h",
      }
    }),
  ],
  controllers: [FollowController],
  providers: [FollowService, NotificationService]
})
export class FollowModule { }
