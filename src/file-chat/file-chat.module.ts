import { Module } from '@nestjs/common';
import { FileChatController } from './file-chat.controller';
import { FileChatService } from './file-chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { env } from 'env';
import { JwtModule } from '@nestjs/jwt';
import { FileChat } from './file-chat.entity';
import { User } from 'src/user/user.entity';
import { Conversation } from 'src/conversation/conversation.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([FileChat, User, Conversation]),
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
  controllers: [FileChatController],
  providers: [FileChatService]
})
export class FileChatModule { }
