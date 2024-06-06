import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';

@Controller('follow')
export class FollowController {
    constructor(private followService: FollowService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    newFollow(@Body() params: any) {
        return this.followService.newFollow(params)
    }
    @Post('unfollow')
    @UseGuards(JwtAuthGuard)
    unfollow(@Body() params: any) {
        return this.followService.unfollow(params)
    }
}
