import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Conversation } from './conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { MessageService } from 'src/message/message.service';
import { Message } from 'src/message/message.entity';

const conversationRelations = {
    participants: true,
    messages: {
        user: true
    },
    file: { user: true },
}
@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(Conversation) private conversationRepository: Repository<Conversation>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Message) private messageRepository: Repository<Message>,
    ) { }

    async createConversation(params: any) {
        // Find users
        const user1 = await this.userRepository.findOneBy({ id: params.user1Id })
        if (!user1) {
            throw new HttpException("USER_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const user2 = await this.userRepository.findOneBy({ id: params.user2Id })
        if (!user1) {
            throw new HttpException("USER_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        // Create conversation
        const conversation = this.conversationRepository.create({
            participants: [user1, user2],
            createdAt: new Date()
        })

        const conversationSaved = await this.conversationRepository.save(conversation)
        if (!conversationSaved) {
            throw new HttpException("CONVERSATION_NOT_CREATED", HttpStatus.INTERNAL_SERVER_ERROR)
        }

        const message = this.messageRepository.create({
            content: params.message,
            user: user1,
            read: 0,
            conversation: conversationSaved,
            createdAt: new Date()
        })
        const messageSaved = await this.messageRepository.save(message)
        if (!messageSaved) {
            throw new HttpException("MESSAGE_NOT_CREATED", HttpStatus.INTERNAL_SERVER_ERROR)
        }

        //add message
        throw new HttpException(conversationSaved, HttpStatus.CREATED)
    }
    async checkConversation(userId1: number, userId2: number) {
        const conversation = await this.conversationRepository
            .createQueryBuilder('conversation')
            .innerJoin('conversation.participants', 'user1')
            .innerJoin('conversation.participants', 'user2')
            .where('user1.id = :userId1', { userId1 })
            .andWhere('user2.id = :userId2', { userId2 })
            .getOne();
        if (conversation) {
            return conversation.id
        }
        return null
    }
    async getConversationsForUser(userId: number): Promise<Conversation[]> {
        const conversations = await this.conversationRepository.find({
            relations: conversationRelations,
            order: {
                createdAt: 'ASC',
                messages: {
                    createdAt: 'ASC',
                },
            }
        })
        const filteredConversations = conversations.filter(conversation =>
            conversation.participants.some(participant => participant.id == userId)
        );
        return filteredConversations
    }
    async countChatMessageUnread(userId: number) {
        const conversations = await this.conversationRepository.find({
            where: [
                { participants: { id: userId } }
            ],
            relations: conversationRelations,
        })

        let unreadMessageCount = 0
        let undreadFileCount = 0
        for (const conversation of conversations) {
            for (const message of conversation.messages) {
                if (message.read === 0 && message.user.id !== userId) {
                    unreadMessageCount++
                }
            }
        }
        for (const conversation of conversations) {
            for (const file of conversation.file) {
                if (file.read === 0 && file.user.id !== userId) {
                    undreadFileCount++
                }
            }
        }
        return {
            statusCode: 200,
            message: unreadMessageCount + undreadFileCount
        }
    }
}
