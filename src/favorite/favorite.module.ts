import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { env } from 'env';
import { JwtModule } from '@nestjs/jwt';
import { Favorite } from './favorite.entity';
import { User } from 'src/user/user.entity';
import { Project } from 'src/project/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite, User, Project]),
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
  controllers: [FavoriteController],
  providers: [FavoriteService]
})
export class FavoriteModule { }
