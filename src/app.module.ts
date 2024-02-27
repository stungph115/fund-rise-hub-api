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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      username: env.DATABASE_USER,
      password: env.DATABASE_PASS,
      database: env.DATABASE_NAME,
      entities: [],
      synchronize: true,
      bigNumberStrings: false,
      /* logging: true */
    }),
    MailerModule,
    UserModule,
    RoleModule,
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
