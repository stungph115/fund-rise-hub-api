import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RewardEarned } from './reward-earned.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Reward } from 'src/reward/reward.entity';

@Injectable()
export class RewardEarnedService {
    constructor(
        @InjectRepository(RewardEarned) private rewardEarnedRepository: Repository<RewardEarned>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Reward) private rewardRepository: Repository<Reward>

    ) { }
    async creatRewardEarned(params: any) {
        const user = await this.userRepository.findOneBy({ id: params.userId })
        if (!user) {
            throw new HttpException('USER_NOT_Found', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const reward = await this.rewardRepository.findOneBy({ id: params.rewardId })
        if (!reward) {
            throw new HttpException('REWARD_NOT_Found', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const newRewardEarned = this.rewardEarnedRepository.create({
            user: user,
            reward: reward,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const newRewardEarnedSaved = this.rewardEarnedRepository.save(newRewardEarned)
        if (!newRewardEarnedSaved) {
            throw new HttpException('ERROR_REWARD_EARNED_CREATION', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return 201
    }
}
