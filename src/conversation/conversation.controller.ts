import { Controller } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
    constructor(private conversationService: ConversationService) { }
}
