import { Module } from '@nestjs/common';
import { InvestController } from './invest.controller';
import { InvestService } from './invest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'env';
import { Payment } from 'src/payment/payment.entity';
import { Invest } from './invest.entity';
import { User } from 'src/user/user.entity';
import { Project } from 'src/project/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Invest, User, Project]),
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
  controllers: [InvestController],
  providers: [InvestService]
})
export class InvestModule { }
