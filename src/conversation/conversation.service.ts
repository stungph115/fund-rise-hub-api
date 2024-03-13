import { Injectable } from '@nestjs/common';
import { Conversation } from './conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(Conversation) private conversationonversationRepository: Repository<Conversation>,

    ) { }
}
