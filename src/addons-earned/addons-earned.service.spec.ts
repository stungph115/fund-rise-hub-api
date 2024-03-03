import { Test, TestingModule } from '@nestjs/testing';
import { AddonsEarnedService } from './addons-earned.service';

describe('AddonsEarnedService', () => {
  let service: AddonsEarnedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddonsEarnedService],
    }).compile();

    service = module.get<AddonsEarnedService>(AddonsEarnedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
