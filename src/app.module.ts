import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {CommonModule} from './common/common.module'
import {CustomerModule} from './customer/customer.module'
import {EventbridgeModule} from './eventbridge/eventbridge.module'
import {RetentativasModule} from './retentativas/retentativas.module'

@Module({
  imports: [CommonModule,CustomerModule,EventbridgeModule,RetentativasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
