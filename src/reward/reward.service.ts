import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reward } from './reward.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RewardService {
    constructor(
        @InjectRepository(Reward) private rewardRepository: Repository<Reward>
    ) { }
}
