import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';

@Controller('campaign')
export class CampaignController {
    constructor(private campaignService: CampaignService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    createCampain(@Body() params: any) {
        return this.campaignService.addCampaign(params)
    }
    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    deleteCampain(@Param('id') campaignId: number) {
        return this.campaignService.deleteCampaign(campaignId)
    }
    @Patch()
    @UseGuards(JwtAuthGuard)
    updateCampaign(@Body() params: any) {
        return this.campaignService.updateCampaign(params)
    }


}
