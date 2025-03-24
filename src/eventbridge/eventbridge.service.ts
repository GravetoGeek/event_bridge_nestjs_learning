import {EventBridgeClient,PutEventsCommand} from '@aws-sdk/client-eventbridge'
import {GetCallerIdentityCommand,STSClient} from "@aws-sdk/client-sts"
import {Injectable} from '@nestjs/common'

@Injectable()
export class EventbridgeService {
    private eventBridge: EventBridgeClient;
    private eventBusName: string;
    private accountId: string;

    constructor() {
        this.eventBridge = new EventBridgeClient({
            region: process.env.AWS_REGION,
            endpoint: process.env.LOCALSTACK_ENDPOINT,
        });
        this.eventBusName = process.env.EVENTBRIDGE_BUS_NAME ?? 'default-event-bus-name';
        this.getAccountId();
    }

    async getAccountId() {
        const client = new STSClient({
            region: process.env.AWS_REGION,
            endpoint: process.env.LOCALSTACK_ENDPOINT,
        });
        const command = new GetCallerIdentityCommand({
        });
        const response = await client.send(command);
        this.accountId = response.Account ?? '';
    }

    async putEvent(detail: any, detailType: string, source: string) {
        const params = {
            Entries: [
                {
                    Detail: JSON.stringify(detail),
                    DetailType: detailType,
                    EventBusName: this.eventBusName,
                    Source: source,
                    Resources: [
                        `arn:aws:sts::${this.accountId}:assumed-role/EC2-Role/i-*`
                    ]
                },
            ],
        };
        const command = new PutEventsCommand(params);
        return this.eventBridge.send(command);
    }
    async agendarRetentativa(dados: any) {
        dados.tentativa = dados.tentativa ? dados.tentativa + 1 : 1;
        let delay = 0;
        if (dados.tentativa === 2) {
            delay = 30000;
            // delay = 60 * 60 * 1000;
        } else if (dados.tentativa === 3) {
            delay = 60000;
            // delay = 4 * 60 * 60 * 1000;
        } else {
            delay = 10000;
            // delay = 5 * 60 * 1000;
        }

        const nextRetryTime = new Date(Date.now() + delay);
        const nextRetryTimeISO = nextRetryTime.toISOString();
        console.log(
        await this.putEvent(
            { ...dados, nextRetryTime: nextRetryTimeISO },
            'agendarRetentativa',
            'api.retentativa.agendamento'
        )
    )
    }

}