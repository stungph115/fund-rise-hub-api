import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { env } from 'env';
import { JwtModule } from '@nestjs/jwt';
import { Category } from './category.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: env.USER_JWT_KEY,
      signOptions: {
        expiresIn: "2h",
      }
    }),
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule { }
