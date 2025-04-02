import {Body,Controller,Post} from '@nestjs/common'
import {CustomerService} from './customer.service'; // Adjust the path as necessary

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

@Controller()
export class CustomerController {
    // This controller will handle requests related to getting customer information
    // You can define your routes and methods here

    constructor(private readonly CustomerService: CustomerService) {}

    // Example:
    @Post('get_customer')
    async get_customer(@Body('id') id:string): Promise<Customer> {
        return this.CustomerService.get_customer(Number(id)); // Ensure the method exists and returns a valid type

    }
}
