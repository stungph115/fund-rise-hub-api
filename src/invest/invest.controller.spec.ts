import { Test, TestingModule } from '@nestjs/testing';
import { InvestController } from './invest.controller';

describe('InvestController', () => {
  let controller: InvestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestController],
    }).compile();

    controller = module.get<InvestController>(InvestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
