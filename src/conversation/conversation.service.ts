import { Injectable } from '@nestjs/common';
import { Conversation } from './conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(Conversation) private conversationRepository: Repository<Conversation>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async createConversation(params: any): Promise<Conversation> {
        // Find users
        const user1 = await this.userRepository.findOneBy({ id: params.user1Id })
        const user2 = await this.userRepository.findOneBy({ id: params.user2Id })
        console.log(user1)
        console.log(user2)
        // Create conversation
        const conversation = this.conversationRepository.create({
            participants: [user1, user2],
            createdAt: new Date()
        })

        return this.conversationRepository.save(conversation)
    }
    async checkConversation(userId1: number, userId2: number): Promise<boolean> {
        console.log('check conversation existe')
        const conversation = await this.conversationRepository
            .createQueryBuilder('conversation')
            .innerJoin('conversation.participants', 'user1')
            .innerJoin('conversation.participants', 'user2')
            .where('user1.id = :userId1', { userId1 })
            .andWhere('user2.id = :userId2', { userId2 })
            .getOne();

        return !!conversation;
    }
    async getConversationsForUser(userId: number): Promise<Conversation[]> {
        console.log("get conversation")
        console.log(userId)
        const conversations = await this.conversationRepository
            .createQueryBuilder('conversation')
            .leftJoinAndSelect('conversation.participants', 'participant')
            .leftJoinAndSelect('conversation.messages', 'message')
            .where('participant.id = :userId', { userId })
            .getMany();
        console.log(conversations)
        return conversations
    }

}
