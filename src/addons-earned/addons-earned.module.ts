import { Module } from '@nestjs/common';
import { AddonsEarnedController } from './addons-earned.controller';
import { AddonsEarnedService } from './addons-earned.service';
import { PassportModule } from '@nestjs/passport';
import { env } from 'env';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddonsEarned } from './addons-earned.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddonsEarned]),
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
  controllers: [AddonsEarnedController],
  providers: [AddonsEarnedService]
})
export class AddonsEarnedModule { }
