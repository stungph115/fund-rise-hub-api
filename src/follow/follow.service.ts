import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Follow) private followRepository: Repository<Follow>,
    ) { }

    async newFollow(params: any) {
        const follower = await this.userRepository.findOneBy({ id: params.idFollower })
        const following = await this.userRepository.findOneBy({ id: params.idFollowing })
        const follow = this.followRepository.create({
            follower: follower,
            following: following,
            createdAt: new Date(),
        })
        const followSave = await this.followRepository.save(follow)
        if (!followSave) {
            throw new HttpException("ERROR_FOLLOW_CREATION", HttpStatus.INTERNAL_SERVER_ERROR)
        } else {
            throw new HttpException("FOLLOW_CREATED", HttpStatus.CREATED)
        }
    }

    async unfollow(params: any) {
        const followDelte = await this.followRepository.delete({ follower: params.followerId, following: params.followingId })
        if (!followDelte) {
            throw new HttpException("ERROR_FOLLOW_DELETING", HttpStatus.INTERNAL_SERVER_ERROR)
        } else {
            throw new HttpException("FOLLOW_DELETED", HttpStatus.OK)
        }
    }
}
