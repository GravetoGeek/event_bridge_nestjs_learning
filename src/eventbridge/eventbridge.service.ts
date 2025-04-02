import {EventBridgeClient,PutEventsCommand} from '@aws-sdk/client-eventbridge'
import {GetCallerIdentityCommand,STSClient} from "@aws-sdk/client-sts"
import {Injectable} from '@nestjs/common'

@Injectable()
export class EventbridgeService {
    private eventBridge: EventBridgeClient
    private eventBusName: string
    private accountId: string

    constructor() {
        this.eventBridge=new EventBridgeClient({
            region: process.env.AWS_REGION,
            endpoint: process.env.LOCALSTACK_ENDPOINT,
        })
        this.eventBusName='RETENTATIVAS_API'
        this.getAccountId()
    }

    async getAccountId() {
        const client=new STSClient({
            region: process.env.AWS_REGION,
            endpoint: process.env.LOCALSTACK_ENDPOINT,
        })
        const command=new GetCallerIdentityCommand({
        })
        const response=await client.send(command)
        this.accountId=response.Account??''
    }

    /**
     * Sends an event to Amazon EventBridge.
     *
     * @param detail - The event payload, which contains the details of the event.
     * @param detailType - A free-form string used to identify the type of the event.
     * @param source - The source of the event, typically the service or application emitting the event.
     * @param eventBusName - The name of the event bus to which the event will be sent.
     * @param time - The timestamp of the event. If not provided, the current time will be used.
     * @returns A promise that resolves with the result of the `PutEventsCommand` execution.
     *
     * @throws An error if the EventBridge service call fails.
     */
    async putEvent({
        detail,
        detailType,
        source,
        eventBusName,
        time
    }) {
        const params={
            Entries: [
                {
                    Detail: JSON.stringify(detail),
                    DetailType: detailType,
                    Time: time,
                    EventBusName: eventBusName||this.eventBusName,
                    Source: source,
                    // Resources: [
                    //     `arn:aws:sts::${this.accountId}:assumed-role/EC2-Role/i-*`
                    // ]
                },
            ],
        }
        const command=new PutEventsCommand(params)
        return this.eventBridge.send(command)
    }

    async agendarRetentativa(dados: { tentativa?: number; [key: string]: any }) {
        dados.tentativa = dados.tentativa ? dados.tentativa + 1 : 1;
        let delay = 0;
        console.log("agendarRetentativa");
        console.log({ tentativa: dados.tentativa });
        console.log({dados})

        if (dados.tentativa === 2) {
            delay = 2 * 60 * 1000; // 5 minutos
        } else if (dados.tentativa === 3) {
            delay = 10 * 60 * 1000; // 10 minutos
        } else if (dados.tentativa > 3) {
            console.log('Máximo de tentativas atingido. Nenhum novo evento será agendado.');
            console.log("HSM Falha");
            return;
        } else {
            delay = 60 * 1000; // 1 minuto
        }

        const nextRetryTime = new Date(Date.now() + delay);

        const event = {
            detail: { ...dados },
            detailType: "realizarRetentativa",
            source: "api.retentativa.realizar",
            eventBusName: this.eventBusName,
            time: nextRetryTime // Corrigido para passar um objeto Date
        };

        const result = await this.putEvent(event)

        console.log(
            result
        );
        return result
    }
}