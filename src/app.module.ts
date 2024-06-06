import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { env } from 'env';
import { APP_FILTER } from '@nestjs/core'
import { ExceptionFilter } from './exception.filter'
import { MailerModule } from './mailer/mailer.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { MessageModule } from './message/message.module';
import { ProjectModule } from './project/project.module';
import { FavoriteModule } from './favorite/favorite.module';
import { CampaignModule } from './campaign/campaign.module';
import { UpdateModule } from './update/update.module';
import { CommentModule } from './comment/comment.module';
import { FaqModule } from './faq/faq.module';
import { RewardModule } from './reward/reward.module';
import { AddonsModule } from './addons/addons.module';
import { RewardEarnedModule } from './reward-earned/reward-earned.module';
import { AddonsEarnedModule } from './addons-earned/addons-earned.module';
import { NotificationModule } from './notification/notification.module';
import { ConversationModule } from './conversation/conversation.module';
import { User } from './user/user.entity';
import { Update } from './update/update.entity';
import { Role } from './role/role.entity';
import { RewardEarned } from './reward-earned/reward-earned.entity';
import { Reward } from './reward/reward.entity';
import { Project } from './project/project.entity';
import { Notification } from './notification/notification.entity';
import { Message } from './message/message.entity';
import { Favorite } from './favorite/favorite.entity';
import { FaQ } from './faq/faq.entity';
import { Conversation } from './conversation/conversation.entity';
import { Comment } from './comment/comment.entity';
import { Campaign } from './campaign/campaign.entity';
import { AddonsEarned } from './addons-earned/addons-earned.entity';
import { Addons } from './addons/addons.entity';
import { FileModule } from './file/file.module';
import { FileChatModule } from './file-chat/file-chat.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { Category } from './category/category.entity';
import { SubCategory } from './sub-category/sub-category.entity';
import { CardPaymentModule } from './card-payment/card-payment.module';
import { FollowModule } from './follow/follow.module';
import { Follow } from './follow/follow.entity';
import { FileChat } from './file-chat/file-chat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      username: env.DATABASE_USER,
      password: env.DATABASE_PASS,
      database: env.DATABASE_NAME,
      entities: [
        User,
        Update,
        Role,
        RewardEarned,
        Reward,
        Project,
        Notification,
        Message,
        Favorite,
        FaQ,
        Conversation,
        Comment,
        Campaign,
        AddonsEarned,
        Addons,
        Category,
        SubCategory,
        Follow,
        FileChat

      ],
      synchronize: true,
      bigNumberStrings: false,
      /* logging: true */
    }),
    MailerModule,
    UserModule,
    RoleModule,
    MessageModule,
    ProjectModule,
    FavoriteModule,
    CampaignModule,
    UpdateModule,
    CommentModule,
    FaqModule,
    RewardModule,
    AddonsModule,
    RewardEarnedModule,
    AddonsEarnedModule,
    NotificationModule,
    ConversationModule,
    FileModule,
    FileChatModule,
    CategoryModule,
    SubCategoryModule,
    CardPaymentModule,
    FollowModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    }
  ],
})
export class AppModule { }
