import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {EventbridgeModule} from './eventbridge/eventbridge.module'
import {GetCustomerModule} from './get_customer/get_customer.module'
import {RetentativasModule} from './retentativas/retentativas.module'


@Module({
  imports: [EventbridgeModule, RetentativasModule, GetCustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
