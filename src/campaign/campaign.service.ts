import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Campaign } from './campaign.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from 'src/project/project.entity';
import { retry } from 'rxjs';

@Injectable()
export class CampaignService {
    constructor(
        @InjectRepository(Campaign) private campaignRepository: Repository<Campaign>,
        @InjectRepository(Project) private projectRepository: Repository<Project>,

    ) { }
    async addCampaign(params: any) {
        const project = await this.projectRepository.findOneBy({ id: params.projectId })
        if (!project) {
            throw new HttpException('PROJECT_NOT_FOUND', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const newCampaign = this.campaignRepository.create({
            project: project,
            title: params.title,
            content: params.content,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const campaignSaved = await this.campaignRepository.save(newCampaign)
        if (!campaignSaved) {
            throw new HttpException('ERROR_CAMPAIGN_SAVE', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return 201
    }
    async deleteCampaign(idCampaign) {
        const campaign = await this.campaignRepository.findOneBy({ id: idCampaign })
        if (!campaign) {
            throw new HttpException('CAMPAIGN_NOT_FOUND', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const campaignDelete = await this.campaignRepository.delete(campaign)
        if (!campaignDelete) {
            throw new HttpException('ERROR_CAMPAIGN_DELETION', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        return 200
    }
    async updateCampaign(params: any) {
        const campaign = await this.campaignRepository.findOneBy({ id: params.idCampaign })
        if (!campaign) {
            throw new HttpException('CAMPAIGN_NOT_FOUND', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        if (params.title) {
            campaign.title = params.title
        }
        if (params.content) {
            campaign.title = params.content
        }
        campaign.updatedAt = new Date()
        const campaignUpdated = await this.campaignRepository.save(campaign)
        if (!campaignUpdated) {
            throw new HttpException('ERROR_CAMPAIGN_UPDATE', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        return 200
    }
}
