import { Test, TestingModule } from '@nestjs/testing';
import { CardPaymentController } from './card-payment.controller';

describe('CardPaymentController', () => {
  let controller: CardPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardPaymentController],
    }).compile();

    controller = module.get<CardPaymentController>(CardPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
