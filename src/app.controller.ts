import {Controller,Get} from '@nestjs/common'
import {AppService} from './app.service'
import {NestjsLoggerService} from './common/services/logger.service'

@Controller()
export class AppController {
    private readonly logger = new NestjsLoggerService({ context: AppController.name });

    constructor(private readonly appService: AppService) {}

    @Get('hello')
    getHello(): string {
        return this.appService.getHello()
    }
}
