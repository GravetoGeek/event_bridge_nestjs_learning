import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventbridgeModule } from './eventbridge/eventbridge.module';
import { RetentativasModule } from './retentativas/retentativas.module';
import { GetCustomerModule } from './get_customer/get_customer.module';
import { EventbridgeController } from './eventbridge/eventbridge.controller';
import { RetentativasController } from './retentativas/retentativas.controller';
import { GetCustomerController } from './get_customer/get_customer.controller';
import { EventbridgeService } from './eventbridge/eventbridge.service';
import { RetentativasService } from './retentativas/retentativas.service';
import { GetCustomerService } from './get_customer/get_customer.service';

@Module({
  imports: [EventbridgeModule, RetentativasModule, GetCustomerModule],
  controllers: [AppController, EventbridgeController, RetentativasController, GetCustomerController],
  providers: [AppService, EventbridgeService, RetentativasService, GetCustomerService],
})
export class AppModule { }
