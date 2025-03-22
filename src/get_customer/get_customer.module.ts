import { Module } from '@nestjs/common';
import { GetCustomerService } from './get_customer.service';
import { GetCustomerController } from './get_customer.controller';

@Module({
  providers: [GetCustomerService],
  controllers: [GetCustomerController]
})
export class GetCustomerModule {}
