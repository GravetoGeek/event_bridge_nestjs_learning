/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {Injectable} from '@nestjs/common'
// import util from 'node:util'
import {EventbridgeService} from 'src/eventbridge/eventbridge.service'
@Injectable()
export class RetentativasService {
    constructor(private eventbridgeService: EventbridgeService) { }

    async realizarRetentativa(dados: { [key: string]: any; tentativa?: number }) {
        try {
            const url = new URL('http://localhost:4566/restapis/ngdgjtymf6/dev/get_customer');
            console.log(url.toString())
            console.log({dados})
            const response = await fetch(url,{
                method:"POST",
                body: JSON.stringify({
                    id: dados.id
                })
            });
            console.log(await response.json())
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData: Record<string, unknown> = await response.json();
            console.log('Retentativa bem-sucedida:', responseData);
            console.log("HSM Sucesso")
            return responseData
        } catch (error) {
            console.error('Retentativa falhou:', error.message);
            // console.error(util.inspect({error}))
            return await this.eventbridgeService.agendarRetentativa(dados)
        }
    }
}