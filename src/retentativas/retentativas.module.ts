import { Module } from '@nestjs/common';
import { RetentativasService } from './retentativas.service';
import { RetentativasController } from './retentativas.controller';

@Module({
  providers: [RetentativasService],
  controllers: [RetentativasController]
})
export class RetentativasModule {}
