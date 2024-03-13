import { Controller } from '@nestjs/common';
import { CampaignService } from './campaign.service';

@Controller('campaign')
export class CampaignController {
    constructor(private campaignService: CampaignService) { }

}
