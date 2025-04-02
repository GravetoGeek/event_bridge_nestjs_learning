import {NestjsLoggerService} from '@/common/services/logger.service'
import {HttpCode,HttpException,HttpStatus,Injectable} from '@nestjs/common'

// Define or import the Customer interface
interface Customer {
    id: number
    name: string
    email: string
    phone: string
    address: string
}

@Injectable()
export class CustomerService {
    constructor(private readonly logger: NestjsLoggerService) {
    }

    @HttpCode(201)
    async get_customer(id: number): Promise<Customer> {
        // Capture Lambda context
        const requestId=process.env.AWS_LAMBDA_REQUEST_ID

        await Promise.resolve()
        const random=Math.random()

        if(random<0.50) {
            const customer={
                id: id,
                name: 'John Doe',
                email: 'edusrm11@gmail.com',
                phone: '5511999999',
                address: 'Rua dos Bobos, 0',
            }
            this.logger.log('Customer found',{customer,requestId})
            return customer
        }

        if(random>=0.50&&random<=0.51) {
            this.logger.warn('Customer not found',{id,requestId})
            throw new HttpException(
                {message: 'Customer not found'},
                HttpStatus.NOT_FOUND,
            )
        }
        this.logger.warn('Internal server error',{id,requestId})
        throw new HttpException(
            {message: 'Internal server error (teste)'},
            HttpStatus.INTERNAL_SERVER_ERROR,
        )
    }
}
