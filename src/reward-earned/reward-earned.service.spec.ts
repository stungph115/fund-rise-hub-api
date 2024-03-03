import { Test, TestingModule } from '@nestjs/testing';
import { RewardEarnedService } from './reward-earned.service';

describe('RewardEarnedService', () => {
  let service: RewardEarnedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardEarnedService],
    }).compile();

    service = module.get<RewardEarnedService>(RewardEarnedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
