import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';

@Controller('conversation')
export class ConversationController {
    constructor(private conversationService: ConversationService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    createConversation(@Body() params: any) {
        return this.conversationService.createConversation(params)
    }

    @Get('check/:userId1/:userId2')
    @UseGuards(JwtAuthGuard)
    async checkConversation(@Param('userId1') userId1: number, @Param('userId2') userId2: number) {
        const exists = await this.conversationService.checkConversation(userId1, userId2);
        return { exists };
    }

    @Get('/:userId')
    @UseGuards(JwtAuthGuard)
    async getConversationUser(@Param('userId') userId: number) {
        return this.conversationService.getConversationsForUser(userId)
    }

    @Get('count-message-unread')
    @UseGuards(JwtAuthGuard)
    countChatMessageUnread(@Body() userId: any) {
        return this.conversationService.countChatMessageUnread(userId.userId)
    }
}
