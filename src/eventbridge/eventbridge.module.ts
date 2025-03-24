import {Module} from '@nestjs/common'
import {EventbridgeController} from './eventbridge.controller'
import {EventbridgeService} from './eventbridge.service'

@Module({
  providers: [EventbridgeService],
  controllers: [EventbridgeController],
  exports: [EventbridgeService],
})
export class EventbridgeModule {}
