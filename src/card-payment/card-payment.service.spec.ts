import { Test, TestingModule } from '@nestjs/testing';
import { CardPaymentService } from './card-payment.service';

describe('CardPaymentService', () => {
  let service: CardPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardPaymentService],
    }).compile();

    service = module.get<CardPaymentService>(CardPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
