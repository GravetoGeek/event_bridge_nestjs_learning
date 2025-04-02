import {Body,Controller,Post} from '@nestjs/common'
import {EventbridgeService} from '../eventbridge/eventbridge.service'

@Controller('eventbridge')
export class EventbridgeController {
    constructor(private readonly eventbridgeService: EventbridgeService) { }

    @Post('agendarRetentativa')
    async agendarRetentativa(@Body() dados: any) {
        // Ensure the event bus exists
        await this.eventbridgeService.agendarRetentativa(dados);
        return { message: "Retentativa agendada com sucesso." };
    }

    @Post('sendEventBus')
    async sendEventBus(@Body() event:any){
        return this.eventbridgeService.putEvent(event)
    }
}
