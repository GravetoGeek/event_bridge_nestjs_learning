import {Controller,Post} from '@nestjs/common'
import {Body} from '@nestjs/common/decorators/http/route-params.decorator'
import {RetentativasService} from './retentativas.service'; // Adjust the path as necessary

@Controller()
export class RetentativasController {
    constructor(private readonly retentativasService: RetentativasService) {}

    @Post('realizarRetentativa')
    async realizarRetentativa(@Body() dados: any) {
        console.log('realizarRetentativa');
        return this.retentativasService.realizarRetentativa(dados);
    }
}
