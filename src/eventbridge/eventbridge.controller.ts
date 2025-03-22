import { Controller, Post, Body } from '@nestjs/common';
import { EventbridgeService } from '../eventbridge/eventbridge.service';

@Controller('eventbridge')
export class EventbridgeController {
    constructor(private readonly eventbridgeService: EventbridgeService) { }

    @Post('agendar')
    async agendarRetentativa(@Body() dados: any) {
        await this.eventbridgeService.agendarRetentativa(dados);
        return { message: "Retentativa agendada com sucesso." };
    }
}
