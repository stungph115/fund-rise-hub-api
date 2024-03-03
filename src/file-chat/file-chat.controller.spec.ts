import { Test, TestingModule } from '@nestjs/testing';
import { FileChatController } from './file-chat.controller';

describe('FileChatController', () => {
  let controller: FileChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileChatController],
    }).compile();

    controller = module.get<FileChatController>(FileChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
