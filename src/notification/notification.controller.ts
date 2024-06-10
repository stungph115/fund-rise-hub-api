import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, SetMetadata, UseGuards, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';

@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService) { }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getNotification(@Param('id', ParseIntPipe) userId: number) {
        return this.notificationService.getNotification(userId)
    }

    @Get('count-unread/:id')
    @UseGuards(JwtAuthGuard)
    getNumberUnreadNotification(@Param('id', ParseIntPipe) userId: number) {
        return this.notificationService.getNumberUnreadNotification(userId)
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    addNotification(@Body() addNotificationDto: any) {
        return this.notificationService.addNotification(addNotificationDto)
    }

    @Patch(':id/:read')
    @UseGuards(JwtAuthGuard)
    setReadNotification(@Param('id', ParseIntPipe) idNotification: number, @Param('read', ParseIntPipe) read: number) {
        return this.notificationService.setReadNotification(idNotification, read)
    }

    @Post('all-read')
    @UseGuards(JwtAuthGuard)
    setAllNotificationRead(@Body() userId: any) {
        return this.notificationService.setAllNotificationRead(userId.userId)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteNotification(@Param('id', ParseIntPipe) id: number) {
        return this.notificationService.deleteNotification(id)

    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    deleteAllNotification(@Body() userId: any) {
        return this.notificationService.deleteAllNotification(userId)

    }
}
