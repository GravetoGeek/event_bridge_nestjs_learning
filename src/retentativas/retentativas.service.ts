/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {Injectable} from '@nestjs/common'
import {EventbridgeService} from '../eventbridge/eventbridge.service'

@Injectable()
export class RetentativasService {
    constructor(private eventbridgeService: EventbridgeService) { }

    async realizarRetentativa(dados: any) {
        try {
            console.log(process.env.API_GET_CUSTOMER_URL)
            if (!process.env.API_GET_CUSTOMER_URL) {
                throw new Error('API_GET_CUSTOMER_URL is not defined in the environment variables');
            }
            const url = new URL(process.env.API_GET_CUSTOMER_URL);
            url.search = new URLSearchParams(dados).toString();
            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log('Retentativa bem-sucedida:', responseData);
            //enviar HSM de sucesso
        } catch (error) {
            console.error('Retentativa falhou:', error.message);
            await this.agendarProximaRetentativa(dados);
        }
    }

    async agendarProximaRetentativa(dados: any) {
        if (dados.retentativa < 3) {
            dados.retentativa++;
            let delay = 0;
            if (dados.retentativa === 2) {
                delay = 60 * 60 * 1000; // 1 hora em milissegundos
            } else if (dados.retentativa === 3) {
                delay = 4 * 60 * 60 * 1000; // 4 horas em milissegundos
            } else {
                delay = 5 * 60 * 1000; // 5 minutos em milissegundos, para a primeira retentativa.
            }

            // Calcula o tempo futuro para a próxima retentativa
            const nextRetryTime = new Date(Date.now() + delay);
            const nextRetryTimeISO = nextRetryTime.toISOString();

            // Envia um evento para o EventBridge para agendar a próxima retentativa
            await this.eventbridgeService.putEvent(
                { ...dados, nextRetryTime: nextRetryTimeISO }, // Inclui o tempo agendado nos detalhes
                'agendarRetentativa', // Um novo detail-type para agendamento
                'api.retentativa.agendamento' // Uma nova source para agendamento
            );
        } else {
            //enviar HSM de falha
            console.log("Todas as retentativas falharam");
        }
    }
}