import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Server } from 'socket.io'
import { Notification } from './notification.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class NotificationService {
    private socketServer: Server
    constructor(
        @InjectRepository(Notification) private notificationRepository: Repository<Notification>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }
    setSocketServer(socketServer: Server) {
        this.socketServer = socketServer
    }
    async getNumberUnreadNotification(userId: any) {
        const user = await this.userRepository.findOneBy({ id: userId.userId })
        if (!user) {
            throw new HttpException("USER_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const numberUnreadNotification = await this.notificationRepository.count({
            where: { user: { id: user.id }, read: 0 }
        })
        return {
            statusCode: HttpStatus.OK,
            numberUnreadNotification
        }
    }

    async getNotification(body: any) {
        const user = await this.userRepository.findOneBy({ id: body.userId })
        if (!user) {
            throw new HttpException("USER_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const notifications = await this.notificationRepository.find({
            where: { user: { id: user.id } },
            order: { createdAt: 'DESC' },
        })
        return {
            statusCode: HttpStatus.OK, notifications: notifications,
        }
    }

    async addNotification(addNotificationDto: any) {
        if (!addNotificationDto.userReceiverId || !addNotificationDto.content) {
            throw new HttpException("ERROR_PARAMS", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const user = await this.userRepository.findOneBy({ id: addNotificationDto.userReceiverId })
        if (!user) {
            throw new HttpException("USER_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const notification = {
            content: addNotificationDto.content,
            read: 0,
            user: user,
            createdAt: new Date(),
            path: addNotificationDto.path
        }
        const notificationCreate = this.notificationRepository.create(notification)
        const notificationSave = await this.notificationRepository.save(notificationCreate)
        if (!notificationSave) {
            throw new HttpException("ERROR_NOTIFICATION_CREATION", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        delete notificationSave.user
        this.socketServer.emit('new_notification_' + user.id, notificationSave)
        return {
            statusCode: 201,
            message: 'NOTIFICATION_CREATED',
            entity: notificationSave,
        }
    }

    async setReadNotification(idNotification: number, read: number) {
        const notification = this.notificationRepository.findOneBy({ id: idNotification })
        if (!notification) {
            throw new HttpException("NOTIFICATION_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const notificationQuerry: Partial<Notification> = {
            read: read
        }
        const notificationUpdated = await this.notificationRepository.update({ id: idNotification }, notificationQuerry)
        if (!notificationUpdated) {
            throw new HttpException("ERROR_NOTIFICATION_UPDATING", HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return {
            statusCode: 200,
            message: 'NOTIFICATION_READ_UPDATED'
        }
    }

    async setAllNotificationRead(userId: any) {
        const user = await this.userRepository.findOneBy({ id: userId.userId })
        if (!user) {
            throw new HttpException("USER_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const result = await this.notificationRepository.update(
            { user: { id: user.id } },
            { read: 1 }
        )

        if (result.affected === 0) {
            throw new HttpException("NO_UNREAD_NOTIFICATIONS", HttpStatus.OK);
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'ALL_NOTIFICATIONS_MARKED_AS_READ',
        }
    }
    async deleteNotification(idNotification: number) {
        const notification = await this.notificationRepository.findOneBy({ id: idNotification })
        if (!notification) {
            throw new HttpException("NOTIFICATION_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const deletionResult = await this.notificationRepository.delete(idNotification)

        if (deletionResult.affected === 0) {
            throw new HttpException("ERROR_DELETING_NOTIFICATION", HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'NOTIFICATION_DELETED',
        }
    }

    async deleteAllNotification(userId: any) {
        const user = await this.userRepository.findOneBy({ id: userId.userId })
        if (!user) {
            throw new HttpException("USER_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const deletionResult = await this.notificationRepository.delete({ user: user as any })

        if (deletionResult.affected === 0) {
            throw new HttpException("NO_NOTIFICATIONS_TO_DELETE", HttpStatus.OK)
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'ALL_NOTIFICATIONS_DELETED',
        }
    }


}
