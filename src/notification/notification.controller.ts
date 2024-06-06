import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, SetMetadata, UseGuards, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';

@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    getNotification(@Body() body: any) {
        return this.notificationService.getNotification(body)
    }

    @Get('count-unread')
    @UseGuards(JwtAuthGuard)
    getNumberUnreadNotification(@Body() userId: number) {
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
        return this.notificationService.setAllNotificationRead(userId)
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
