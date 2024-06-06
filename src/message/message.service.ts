import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Server } from 'socket.io'
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { Conversation } from 'src/conversation/conversation.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class MessageService {
    private socketServer: Server
    constructor(
        @InjectRepository(Message) private messageRepository: Repository<Message>,
        @InjectRepository(Conversation) private conversationRepository: Repository<Conversation>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }
    setSocketServer(socketServer: Server) {
        this.socketServer = socketServer

    }
    async addMessage(addMessageParams: any) {

        if (!addMessageParams.message || !addMessageParams.conversationId || !addMessageParams.userId) {
            throw new HttpException("ERROR_PARAMS", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const conversation = await this.conversationRepository.findOne({
            where: { id: addMessageParams.conversationId },
            relations: { participants: true }
        })
        if (!conversation) {
            throw new HttpException("CONVERSATION_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const user = await this.userRepository.findOneBy({ id: addMessageParams.userId })
        if (!user) {
            throw new HttpException("USER_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const message = this.messageRepository.create({
            content: addMessageParams.message,
            user: user,
            read: 0,
            conversation: conversation,
            createdAt: new Date()
        })
        const messageSaved = await this.messageRepository.save(message)
        if (!messageSaved) {
            throw new HttpException("MESSAGE_NOT_CREATED", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        conversation.participants.forEach(user => {
            try {
                this.socketServer.emit('new_message_' + user.id);
            } catch (error) {
                console.error('Error emitting event to user:', user.id, error);
            }
        })
        throw new HttpException(conversation, HttpStatus.CREATED)
    }
    async setMessageRead(idMessage: number) {
        const message = await this.messageRepository.findOne({ where: { id: idMessage }, relations: { conversation: true } })
        if (!message) {
            throw new HttpException("MESSAGE_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const conversation = await this.conversationRepository.findOne({
            where: {
                id: message.conversation.id
            }, relations: {
                participants: true
            }
        })
        if (!conversation) {
            throw new HttpException("CONVERSATION_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const messageQuery: Partial<Message> = {
            read: 1
        }
        const messageUpdated = await this.messageRepository.update({ id: idMessage }, messageQuery)
        if (!messageUpdated) {
            throw new HttpException("ERROR_MESSAGE_UPDATING", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        conversation.participants.forEach(user => {
            this.socketServer.emit('message_read_updated_' + user.id)
        })
        return {
            statusCode: 200,
            message: 'MESSAGE_READ_UPDATED'
        }
    }
}
