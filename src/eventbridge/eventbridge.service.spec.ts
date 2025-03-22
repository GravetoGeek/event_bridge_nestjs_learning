import { Test, TestingModule } from '@nestjs/testing';
import { EventbridgeService } from './eventbridge.service';

describe('EventbridgeService', () => {
  let service: EventbridgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventbridgeService],
    }).compile();

    service = module.get<EventbridgeService>(EventbridgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
