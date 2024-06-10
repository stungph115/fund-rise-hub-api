import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RewardEarnedService } from './reward-earned.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';

@Controller('reward-earned')
export class RewardEarnedController {
    constructor(private rewardEarnedService: RewardEarnedService) { }
    @Post('')
    @UseGuards(JwtAuthGuard)
    createRewardEarned(@Body() paymentData: any) {
        return this.rewardEarnedService.creatRewardEarned(paymentData)
    }

}
