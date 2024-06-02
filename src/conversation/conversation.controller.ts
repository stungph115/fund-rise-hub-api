import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
    constructor(private conversationService: ConversationService) { }

    @Post()
    createConversation(@Body() params: any) {
        return this.conversationService.createConversation(params)
    }

    @Get('check/:userId1/:userId2')
    async checkConversation(@Param('userId1') userId1: number, @Param('userId2') userId2: number): Promise<{ exists: boolean }> {
        const exists = await this.conversationService.checkConversation(userId1, userId2);
        return { exists };
    }

    @Get('conversation/:userId')
    async getConversationUser(@Param('userId') userId: number) {
        return this.conversationService.getConversationsForUser(userId)
    }
}
