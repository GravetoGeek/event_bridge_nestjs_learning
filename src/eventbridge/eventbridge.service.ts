import { Injectable } from '@nestjs/common';
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";

@Injectable()
export class EventbridgeService {
    private eventBridge: EventBridgeClient;
    private eventBusName: string;
    private accountId: string;

    constructor() {
        this.eventBridge = new EventBridgeClient({ region: process.env.AWS_REGION });
        this.eventBusName = process.env.EVENTBRIDGE_BUS_NAME ?? 'default-event-bus-name';
        this.getAccountId();
    }

    async getAccountId() {
        const client = new STSClient({ region: process.env.AWS_REGION });
        const command = new GetCallerIdentityCommand({});
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
        dados.retentativa = dados.retentativa ? dados.retentativa + 1 : 1;
        let delay = 0;
        if (dados.retentativa === 2) {
            delay = 60 * 60 * 1000;
        } else if (dados.retentativa === 3) {
            delay = 4 * 60 * 60 * 1000;
        } else {
            delay = 5 * 60 * 1000;
        }

        const nextRetryTime = new Date(Date.now() + delay);
        const nextRetryTimeISO = nextRetryTime.toISOString();

        await this.putEvent(
            { ...dados, nextRetryTime: nextRetryTimeISO },
            'agendarRetentativa',
            'api.retentativa.agendamento'
        );
    }

}