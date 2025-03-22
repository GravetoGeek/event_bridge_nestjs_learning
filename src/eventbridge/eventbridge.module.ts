import { Module } from '@nestjs/common';
import { EventbridgeService } from './eventbridge.service';
import { EventbridgeController } from './eventbridge.controller';

@Module({
  providers: [EventbridgeService],
  controllers: [EventbridgeController]
})
export class EventbridgeModule {}
