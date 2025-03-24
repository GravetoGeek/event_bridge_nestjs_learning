import {Injectable} from '@nestjs/common'

@Injectable()
export class GetCustomerService {
    async getCustomer() {

        await Promise.resolve(); // Simulate an asynchronous operation
        const random = Math.random() * 0.45;

        if (random > 0.45) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    id: 1,
                    name: 'John Doe',
                    email: 'edusrm11@gmail.com',
                    phone: '5511999999999',
                    address: 'Rua dos Bobos, 0'
                }),
            };
        }
        else {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'Internal server error'
                }),
            };
        }
    }
}
