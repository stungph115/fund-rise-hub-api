import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { FindManyOptions, FindOptionsWhere, Like, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Campaign } from 'src/campaign/campaign.entity';
import { Category } from 'src/category/category.entity';
import { SubCategory } from 'src/sub-category/sub-category.entity';
import { Reward } from 'src/reward/reward.entity';
import { CreateProjectDto, FindProjectDto, UpdateProjectDto } from './project.dto';
import { ProjectPhotos } from './projectPhotos.entity';
import { Invest } from 'src/invest/invest.entity';
const projectRelation = {
    userCreator: true,
    campaign: true,
    reward: true,
    faq: true,
    update: true,
    category: true,
    subCategory: true,
    comment: true,
    favorites: { user: true },
    photos: true,
    investments: { user: true }
}
@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project) private projectRepository: Repository<Project>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(SubCategory) private subCategoryRepository: Repository<SubCategory>,
        @InjectRepository(Campaign) private campaignRepository: Repository<Campaign>,
        @InjectRepository(Reward) private rewardRepository: Repository<Reward>,
        @InjectRepository(ProjectPhotos) private projectPhotosRepository: Repository<ProjectPhotos>,
        @InjectRepository(Invest) private investRepository: Repository<Invest>,
    ) { }
    async addProject(params: any) {
        if (!params.userId || !params.goal || !params.deadline || !params.campaigns || !params.category || !params.descriptions || !params.title) {
            throw new HttpException('ERROR_PARAMS', HttpStatus.UNPROCESSABLE_ENTITY)

        }
        const user = await this.userRepository.findOneBy({ id: params.userId })
        if (!user) {
            throw new HttpException('USER_NOT_EXISTS', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const category = await this.categoryRepository.findOneBy({ id: params.category })
        if (!category) {
            throw new HttpException('CATEGORY_NOT_EXISTS', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        var subCategory = null
        if (params.subCategory) {
            subCategory = await this.subCategoryRepository.findOneBy({ id: params.subCategory })
            if (!subCategory) {
                throw new HttpException('SUBCATEGORY_NOT_EXISTS', HttpStatus.UNPROCESSABLE_ENTITY)
            }

        }
        const newProject = this.projectRepository.create({
            userCreator: user,
            goal: params.goal,
            descriptions: params.descriptions,
            status: 'funding',
            title: params.title,
            deadline: params.deadline,
            category: category,
            subCategory: subCategory,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        console.log(newProject)
        const projectSaved = await this.projectRepository.save(newProject)

        if (!projectSaved) {
            throw new HttpException('PROJECT_NOT_SAVED', HttpStatus.INTERNAL_SERVER_ERROR)

        }

        for (const campaign of params.campaigns) {
            const newCampaign = this.campaignRepository.create({
                title: campaign.title,
                content: campaign.content,
                project: projectSaved,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            const campaignSaved = await this.campaignRepository.save(newCampaign)
            if (!campaignSaved) {
                throw new HttpException('CAMPAIGN_NOT_SAVED', HttpStatus.INTERNAL_SERVER_ERROR)
            }

        }

        if (params.rewards) {
            for (const reward of params.rewards) {
                const newReward = this.rewardRepository.create({
                    title: reward.title,
                    description: reward.description,
                    price: reward.price,
                    photo: reward.photo ? reward.photo : null,
                    project: projectSaved,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                const rewardSaved = await this.rewardRepository.save(newReward)
                if (!rewardSaved) {
                    throw new HttpException('reward_NOT_SAVED', HttpStatus.INTERNAL_SERVER_ERROR)
                }

            }
        }
        if (params.photos) {
            for (const photo of params.photos) {
                const newPhoto = this.projectPhotosRepository.create({
                    name: photo,
                    project: projectSaved
                })
                const photoSaved = await this.projectPhotosRepository.save(newPhoto)
                if (!photoSaved) {
                    throw new HttpException('PROJECT_PHOTO_NOT_SAVED', HttpStatus.INTERNAL_SERVER_ERROR)
                }

            }
        }
        return {
            projectId: projectSaved.id,
            status: 201
        }

    }
    async getProject(projectId: number) {
        const project = await this.projectRepository.findOne({ where: { id: projectId }, relations: projectRelation })
        if (!project) {
            throw new HttpException("PROJECT_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY)
        }
        return project
    }
    //admin
    async getProjectsAdmin() {
        const projects = this.projectRepository.find({ relations: projectRelation })
        return projects
    }

    //discover projects
    /*  async discoverProjects(params: FindProjectDto) {
         const where: FindOptionsWhere<Project> = { status: 'funding' };
         if (params.title) {
             where.title = params.title
         }
         if (params.descriptions) {
             where.descriptions = params.descriptions
         }
         if (params.userId) {
             where.userCreator = { id: params.userId };
         }
         if (params.categoryId) {
             where.category = { id: params.categoryId };
         }
         if (params.subCategoryId) {
             where.subCategory = { id: params.subCategoryId };
         }
         if (params.goal) {
             where.goal = params.goal;
         }
         if (params.deadline) {
             where.deadline = params.deadline;
         }
 
         const options: FindManyOptions<Project> = { where, relations: projectRelation };
         const projects = await this.projectRepository.find(options);
         return projects;
     } */

    async updateProject(projectId: number, updateParams: UpdateProjectDto) {
        const project = await this.projectRepository.findOne({ where: { id: projectId }, relations: projectRelation });
        if (!project) {
            throw new HttpException("PROJECT_NOT_FOUND", HttpStatus.UNPROCESSABLE_ENTITY);
        }

        for (const key in updateParams) {
            if (updateParams.hasOwnProperty(key) && key !== 'id') {
                project[key] = updateParams[key];
            }
        }
        project.updatedAt = new Date();

        const updatedProject = await this.projectRepository.save(project);
        if (!updatedProject) {
            throw new HttpException('PROJECT_NOT_UPDATED', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return updatedProject;
    }
    async discoverProjectsAdvanced(params: FindProjectDto) {
        console.log("here", params)
        const where: FindOptionsWhere<Project> = { status: 'funding' };
        if (params.title) where.title = Like(`%${params.title}%`);
        if (params.userId) where.userCreator = { id: params.userId };
        if (params.categoryId) where.category = { id: params.categoryId };
        if (params.subCategoryId) where.subCategory = { id: params.subCategoryId };

        const options: FindManyOptions<Project> = { where, relations: projectRelation };

        let projects = await this.projectRepository.find(options);

        // Add additional filtering logic here
        if (params.topFavorites) {
            projects = projects.sort((a, b) => b.favorites.length - a.favorites.length).slice(0, 10);
        }

        if (params.topComments) {
            projects = projects.sort((a, b) => b.comment.length - a.comment.length).slice(0, 10);
        }

        if (params.reach90Percent) {
            projects = projects.filter(project => project.investments.reduce((sum, invest) => sum + invest.amount, 0) / project.goal >= 0.9);
        }

        if (params.expireSoon) {
            const now = new Date();
            const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            projects = projects.filter(project => project.deadline <= weekFromNow);
        }

        if (params.topLatest) {
            projects = projects.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 10);
        }

        if (params.topPassedGoal) {
            projects = projects.filter(project => project.investments.reduce((sum, invest) => sum + invest.amount, 0) >= project.goal)
                .sort((a, b) => (b.investments.reduce((sum, invest) => sum + invest.amount, 0) / b.goal) -
                    (a.investments.reduce((sum, invest) => sum + invest.amount, 0) / a.goal)).slice(0, 10);
        }

        return projects;
    }

    async getFundedProjectCount() {
        const fundedProjects = await this.projectRepository.count({
            where: { status: 'funding' }
        });
        console.log(fundedProjects)
        return fundedProjects;
    }

    async getFundedCount() {
        const result = await this.investRepository
            .createQueryBuilder('invest')
            .select('SUM(invest.amount)', 'total')
            .getRawOne();
        console.log(result)

        return result.total || 0;
    }

    async getPledgeCount() {
        const pledgeCount = await this.investRepository.count();
        console.log(pledgeCount)

        return pledgeCount;
    }

}
