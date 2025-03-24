import {Controller,Get} from '@nestjs/common'
import {GetCustomerService} from './get_customer.service'; // Adjust the path as necessary

@Controller('customer')
export class GetCustomerController {
    // This controller will handle requests related to getting customer information
    // You can define your routes and methods here

    constructor(private readonly GetCustomerService: GetCustomerService) {}

    // Example:
    @Get()
    getCustomerById() {
        console.log('getCustomerById');
      return this.GetCustomerService.getCustomer(); // Ensure the method exists and returns a valid type
    }
}
