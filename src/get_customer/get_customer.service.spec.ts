import { Test, TestingModule } from '@nestjs/testing';
import { GetCustomerService } from './get_customer.service';

describe('GetCustomerService', () => {
  let service: GetCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCustomerService],
    }).compile();

    service = module.get<GetCustomerService>(GetCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
