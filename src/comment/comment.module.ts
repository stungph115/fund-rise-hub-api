import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { env } from 'env';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { Project } from 'src/project/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Project]),
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
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule { }
