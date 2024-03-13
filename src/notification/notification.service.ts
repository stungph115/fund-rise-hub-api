import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { on } from 'events';
import { Notification } from './notification.enity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification) private notificationRepository: Repository<Notification>
    ) { }
}
