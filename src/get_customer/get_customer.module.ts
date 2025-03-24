import {Module} from '@nestjs/common'
import {GetCustomerController} from './get_customer.controller'
import {GetCustomerService} from './get_customer.service'

@Module({
    providers: [GetCustomerService],
    controllers: [GetCustomerController],
    exports: [GetCustomerService],
})
export class GetCustomerModule {}
