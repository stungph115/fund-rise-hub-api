import { Module } from '@nestjs/common';
import { CardPaymentController } from './card-payment.controller';
import { CardPaymentService } from './card-payment.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'env';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [CardPaymentController],
  providers: [CardPaymentService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: env.USER_JWT_KEY,
      signOptions: {
        expiresIn: "2h",
      }
    }),
  ]

})
export class CardPaymentModule { }
