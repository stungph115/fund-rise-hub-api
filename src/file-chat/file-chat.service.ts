import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Server } from 'socket.io'
import { Repository } from 'typeorm';
import { FileChat } from './file-chat.entity';
import { Conversation } from 'src/conversation/conversation.entity';
import { User } from 'src/user/user.entity';
const fs = require('fs')

@Injectable()
export class FileChatService {
    private socketServer: Server
    constructor(
        @InjectRepository(FileChat) private fileChatRepository: Repository<FileChat>,
        @InjectRepository(Conversation) private chatConversationRepository: Repository<Conversation>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }
    setSocketServer(socketServer: Server) {
        this.socketServer = socketServer
    }
    async addFile(addFileParams: any) {
        if (!addFileParams.blob || !addFileParams.conversationId || !addFileParams.userId || !addFileParams.name) {
            throw new HttpException("ERROR_PARAMS", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const user = await this.userRepository.findOneBy({ id: addFileParams.userId })
        if (!user) {
            throw new HttpException("USER_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const conversation = await this.chatConversationRepository.findOne({
            where: {
                id: addFileParams.conversationId
            }, relations: {
                participants: true
            }
        })
        if (!conversation) {
            throw new HttpException("CONVERSATION_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const extension = addFileParams.name.split('.').pop().toLocaleLowerCase()
        if (!['txt', 'rtf', 'doc', 'docx', 'odt', 'csv', 'xls', 'xlsx', 'xlsm', 'ods', 'ppt', 'pptx', 'odp', 'svg',
            'odg', 'pdf', 'bmp', 'jpg', 'jpeg', 'gif', 'png', 'wma', 'wmv', 'mp3', 'mpg', 'mp4', 'avi', 'mkv', 'xml'].includes(extension)) {
            throw new HttpException("BAD_EXTENSION", HttpStatus.UNPROCESSABLE_ENTITY)
        }

        let name =
            addFileParams.name.slice(0, addFileParams.name.lastIndexOf('.')) +
            (Math.random() + 1).toString(36).substring(2) +
            '.' + extension

        let filePath = './public/' + name

        // Check if the file already exists
        while (fs.existsSync(filePath)) {
            // Rename the file
            name =
                addFileParams.name.slice(0, addFileParams.name.lastIndexOf('.')) +
                (Math.random() + 1).toString(36).substring(2) +
                '.' + extension;
            filePath = './public/' + name
        }

        fs.writeFileSync(filePath, Buffer.from(addFileParams.blob))

        const file = this.fileChatRepository.create({
            name,
            user: user,
            conversation: conversation,
            size: addFileParams.size,
            createdAt: new Date(),
        })
        const fileSave = await this.fileChatRepository.save(file)
        if (!fileSave) {
            throw new HttpException("ERROR_FILE_CREATION", HttpStatus.INTERNAL_SERVER_ERROR)
        } else {
            const savedFilePath = './public/' + fileSave.name
            if (filePath !== savedFilePath) {
                // File was saved with a different name, throw an exception
                throw new HttpException("ERROR_FILE_RENAME", HttpStatus.INTERNAL_SERVER_ERROR)
            }
            conversation.participants.forEach(user => {
                this.socketServer.emit('new_file_' + user.id)
            })


            throw new HttpException("FILE_CREATED", HttpStatus.CREATED)
        }

    }
    async setFileRead(idFileChat: number) {
        const file = await this.fileChatRepository.findOne({ where: { id: idFileChat }, relations: { conversation: true } })
        if (!file) {
            throw new HttpException("FILE_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const fileQuery: Partial<FileChat> = {
            read: 1
        }
        const conversation = await this.chatConversationRepository.findOne({
            where: {
                id: file.conversation.id
            }, relations: {
                participants: true
            }
        })
        if (!conversation) {
            throw new HttpException("CONVERSATION_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const fileUpdated = await this.fileChatRepository.update({ id: idFileChat }, fileQuery)
        if (!fileUpdated) {
            throw new HttpException("ERROR_FILE_UPDATING", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        conversation.participants.forEach(user => {
            this.socketServer.emit('file_read_updated_' + user.id)
        })

        return {
            statusCode: 200,
            message: 'FILE_READ_UPDATED'
        }
    }
}
