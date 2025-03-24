import {NestFactory} from '@nestjs/core'
import * as dotenv from 'dotenv'
import {AppModule} from './app.module'

async function bootstrap() {
  dotenv.config({ path: '.env.development' })
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
