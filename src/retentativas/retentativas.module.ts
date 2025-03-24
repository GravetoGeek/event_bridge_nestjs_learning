import {Module} from '@nestjs/common'
import {EventbridgeModule} from 'src/eventbridge/eventbridge.module'
import {RetentativasController} from './retentativas.controller'
import {RetentativasService} from './retentativas.service'

@Module({
    imports: [EventbridgeModule],
    providers: [RetentativasService],
    controllers: [RetentativasController],
    exports: [RetentativasService],
})
export class RetentativasModule {}
