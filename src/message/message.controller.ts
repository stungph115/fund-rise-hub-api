import { Body, Controller, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';

@Controller('message')
export class MessageController {
    constructor(private messageService: MessageService) { }
    @Post()
    @UseGuards(JwtAuthGuard)
    addMessage(@Body() addMessageChatDto: any) {
        return this.messageService.addMessage(addMessageChatDto)

    }
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    setMessageRead(@Param('id', ParseIntPipe) messageId: number) {
        return this.messageService.setMessageRead(messageId)
    }
}
