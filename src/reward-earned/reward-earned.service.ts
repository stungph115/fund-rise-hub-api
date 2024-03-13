import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RewardEarned } from './reward-earned.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RewardEarnedService {
    constructor(
        @InjectRepository(RewardEarned) private rewardEarnedRepository: Repository<RewardEarned>
    ) { }
}
