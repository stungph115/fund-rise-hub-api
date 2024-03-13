import { Controller } from '@nestjs/common';
import { RewardEarnedService } from './reward-earned.service';

@Controller('reward-earned')
export class RewardEarnedController {
    constructor(private rewardEarnedService: RewardEarnedService) { }
}
