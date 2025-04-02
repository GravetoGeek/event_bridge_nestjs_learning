import {Global,Module} from '@nestjs/common'
import {NestjsLoggerService} from './services/logger.service'

@Global()
@Module({
    providers: [NestjsLoggerService],
    exports: [NestjsLoggerService]
})
export class CommonModule {}
