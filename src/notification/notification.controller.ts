import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
    constructor(private notifcationService: NotificationService) { }
}
