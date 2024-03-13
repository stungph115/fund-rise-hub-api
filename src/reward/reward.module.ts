import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { env } from 'env';
import { JwtModule } from '@nestjs/jwt';
import { Reward } from './reward.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Reward]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: env.USER_JWT_KEY,
      signOptions: {
        expiresIn: "2h",
      }
    }),
  ],
  controllers: [RewardController],
  providers: [RewardService]
})
export class RewardModule { }
