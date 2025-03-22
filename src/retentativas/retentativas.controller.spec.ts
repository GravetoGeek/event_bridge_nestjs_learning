import { Test, TestingModule } from '@nestjs/testing';
import { RetentativasController } from './retentativas.controller';

describe('RetentativasController', () => {
  let controller: RetentativasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetentativasController],
    }).compile();

    controller = module.get<RetentativasController>(RetentativasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
