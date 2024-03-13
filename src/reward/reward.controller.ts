import { Controller } from '@nestjs/common';
import { RewardService } from './reward.service';

@Controller('reward')
export class RewardController {
    constructor(private rewardService: RewardService) { }
}
