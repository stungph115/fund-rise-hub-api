import { Controller } from '@nestjs/common';
import { AddonsService } from './addons.service';

@Controller('addons')
export class AddonsController {
    constructor(private addonsService: AddonsService) { }

}
