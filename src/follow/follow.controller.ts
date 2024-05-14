import { Body, Controller, Post } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
    constructor(private followService: FollowService) { }

    @Post()
    addUser(@Body() params: any) {
        return this.followService.newFollow(params)
    }
    @Post('unfollow')
    unfollow(@Body() params: any) {
        return this.followService.unfollow(params)
    }
}
