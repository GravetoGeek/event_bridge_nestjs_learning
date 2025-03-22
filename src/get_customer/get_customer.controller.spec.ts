import { Test, TestingModule } from '@nestjs/testing';
import { GetCustomerController } from './get_customer.controller';

describe('GetCustomerController', () => {
  let controller: GetCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetCustomerController],
    }).compile();

    controller = module.get<GetCustomerController>(GetCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
