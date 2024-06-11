import { IsOptional, IsString, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export interface CreateProjectDto {
    userId: number;
    goal: number;
    deadline: string;
    title: string;
    descriptions: string;
    category: number;
    subCategory?: number;
    photos?: string[];
    campaigns: CreateCampaignDto[];
    rewards?: CreateRewardDto[];
}

export interface CreateCampaignDto {
    title: string;
    content: string;
}

export interface CreateRewardDto {
    title: string;
    description: string;
    price: number;
    photo: string;
}

export interface UpdateProjectDto {
    title?: string;
    descriptions?: string;
    goal?: number;
    deadline?: string;
    category?: number;
    subCategory?: number;
    status?: string;
}

/* export interface FindProjectDto {
    title?: string;
    descriptions?: string;
    userId?: number;
    goal?: number;
    deadline?: Date;
    categoryId?: number;
    subCategoryId?: number;
}
 */

export class FindProjectDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsNumber()
    userId?: number;

    @IsOptional()
    @IsNumber()
    categoryId?: number;

    @IsOptional()
    @IsNumber()
    subCategoryId?: number;

    @IsOptional()
    @IsBoolean()
    topFavorites?: boolean;

    @IsOptional()
    @IsBoolean()
    topComments?: boolean;

    @IsOptional()
    @IsBoolean()
    reach90Percent?: boolean;

    @IsOptional()
    @IsBoolean()
    expireSoon?: boolean;

    @IsOptional()
    @IsBoolean()
    topLatest?: boolean;

    @IsOptional()
    @IsBoolean()
    topPassedGoal?: boolean;

    @IsOptional()
    @IsString()
    descriptions?: string;

    @IsOptional()
    @IsNumber()
    goal?: number;

    @IsOptional()
    @IsDateString()
    deadline?: string;
}
