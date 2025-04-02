import {CommonModule} from '@/common/common.module'
import {Module} from '@nestjs/common'
import {CustomerController} from './customer.controller'
import {CustomerService} from './customer.service'

@Module({
    imports: [CommonModule],
    providers: [CustomerService],
    controllers: [CustomerController],
    exports: [CustomerService],
})
export class CustomerModule {}

