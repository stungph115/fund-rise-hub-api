import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';

@Controller('comment')
export class CommentController {
    constructor(private commentSerivce: CommentService) { }
    @Post()
    @UseGuards(JwtAuthGuard)
    addComment(@Body() params: any) {
        return this.commentSerivce.addComment(params)
    }
    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    deleteCampain(@Param('id') commentId: number) {
        return this.commentSerivce.deleteComment(commentId)
    }
}
