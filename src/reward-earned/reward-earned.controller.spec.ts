import { Test, TestingModule } from '@nestjs/testing';
import { RewardEarnedController } from './reward-earned.controller';

describe('RewardEarnedController', () => {
  let controller: RewardEarnedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardEarnedController],
    }).compile();

    controller = module.get<RewardEarnedController>(RewardEarnedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
