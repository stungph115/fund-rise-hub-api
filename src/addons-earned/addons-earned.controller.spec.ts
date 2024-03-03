import { Test, TestingModule } from '@nestjs/testing';
import { AddonsEarnedController } from './addons-earned.controller';

describe('AddonsEarnedController', () => {
  let controller: AddonsEarnedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddonsEarnedController],
    }).compile();

    controller = module.get<AddonsEarnedController>(AddonsEarnedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
