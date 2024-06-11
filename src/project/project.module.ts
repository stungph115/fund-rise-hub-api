import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { env } from 'env';
import { JwtModule } from '@nestjs/jwt';
import { Project } from './project.entity';
import { User } from 'src/user/user.entity';
import { Campaign } from 'src/campaign/campaign.entity';
import { Category } from 'src/category/category.entity';
import { SubCategory } from 'src/sub-category/sub-category.entity';
import { Reward } from 'src/reward/reward.entity';
import { ProjectPhotos } from './projectPhotos.entity';
import { Invest } from 'src/invest/invest.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, User, Campaign, Category, SubCategory, Reward, ProjectPhotos, Invest]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: env.USER_JWT_KEY,
      signOptions: {
        expiresIn: "48h",
      }
    }),
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule { }
