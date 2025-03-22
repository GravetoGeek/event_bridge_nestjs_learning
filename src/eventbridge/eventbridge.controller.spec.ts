import { Test, TestingModule } from '@nestjs/testing';
import { EventbridgeController } from './eventbridge.controller';

describe('EventbridgeController', () => {
  let controller: EventbridgeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventbridgeController],
    }).compile();

    controller = module.get<EventbridgeController>(EventbridgeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
