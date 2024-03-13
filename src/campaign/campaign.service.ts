import { Injectable } from '@nestjs/common';
import { Campaign } from './campaign.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CampaignService {
    constructor(
        @InjectRepository(Campaign) private campaignRepository: Repository<Campaign>,
    ) { }
}
