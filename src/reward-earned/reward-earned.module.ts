import { Module } from '@nestjs/common';
import { RewardEarnedController } from './reward-earned.controller';
import { RewardEarnedService } from './reward-earned.service';

@Module({
  controllers: [RewardEarnedController],
  providers: [RewardEarnedService]
})
export class RewardEarnedModule {}
