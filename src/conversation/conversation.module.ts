import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { env } from 'env';
import { JwtModule } from '@nestjs/jwt';
import { Conversation } from './conversation.entity';
import { User } from 'src/user/user.entity';
import { Message } from 'src/message/message.entity';
import { File } from 'src/file/file.entity';
import { FileChat } from 'src/file-chat/file-chat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, User, Message, FileChat]),
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
  controllers: [ConversationController],
  providers: [ConversationService]
})
export class ConversationModule { }
