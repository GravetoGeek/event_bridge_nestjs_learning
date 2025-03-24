import {Controller,Post} from '@nestjs/common'
import {Body} from '@nestjs/common/decorators/http/route-params.decorator'
import {RetentativasService} from './retentativas.service'; // Adjust the path as necessary

@Controller('retentativas')
export class RetentativasController {
    constructor(private readonly retentativasService: RetentativasService) {}

    @Post('realizar')
    async realizarRetentativa(@Body() dados: any) {
        console.log('realizarRetentativa');
        return this.retentativasService.realizarRetentativa(dados);
    }
    @Post('agendar')
    async agendarProximaRetentativa(@Body() dados: any) {
        console.log('agendarProximaRetentativa');
        return this.retentativasService.agendarProximaRetentativa(dados);
    }
}
