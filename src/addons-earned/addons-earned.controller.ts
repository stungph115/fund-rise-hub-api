import { Controller } from '@nestjs/common';
import { AddonsEarnedService } from './addons-earned.service';

@Controller('addons-earned')
export class AddonsEarnedController {
    constructor(private addonsEarnedService: AddonsEarnedService) { }

}
