import { Module } from '@nestjs/common';
import { AddonsController } from './addons.controller';
import { AddonsService } from './addons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addons } from './addons.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'env';

@Module({
  imports: [
    TypeOrmModule.forFeature([Addons]),
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
  controllers: [AddonsController],
  providers: [AddonsService]
})
export class AddonsModule { }
