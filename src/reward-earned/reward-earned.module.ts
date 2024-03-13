import { Module } from '@nestjs/common';
import { RewardEarnedController } from './reward-earned.controller';
import { RewardEarnedService } from './reward-earned.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { env } from 'env';
import { JwtModule } from '@nestjs/jwt';
import { RewardEarned } from './reward-earned.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([RewardEarned]),
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
  controllers: [RewardEarnedController],
  providers: [RewardEarnedService]
})
export class RewardEarnedModule { }
