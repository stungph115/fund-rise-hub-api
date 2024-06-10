import { Test, TestingModule } from '@nestjs/testing';
import { InvestService } from './invest.service';

describe('InvestService', () => {
  let service: InvestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestService],
    }).compile();

    service = module.get<InvestService>(InvestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
