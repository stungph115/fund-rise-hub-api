import { Module } from '@nestjs/common';
import { FileChatController } from './file-chat.controller';
import { FileChatService } from './file-chat.service';

@Module({
  controllers: [FileChatController],
  providers: [FileChatService]
})
export class FileChatModule {}
