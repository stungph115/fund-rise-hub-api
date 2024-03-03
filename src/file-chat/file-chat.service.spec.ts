import { Test, TestingModule } from '@nestjs/testing';
import { FileChatService } from './file-chat.service';

describe('FileChatService', () => {
  let service: FileChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileChatService],
    }).compile();

    service = module.get<FileChatService>(FileChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
