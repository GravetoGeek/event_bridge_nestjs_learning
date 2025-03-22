import { Test, TestingModule } from '@nestjs/testing';
import { RetentativasService } from './retentativas.service';

describe('RetentativasService', () => {
  let service: RetentativasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetentativasService],
    }).compile();

    service = module.get<RetentativasService>(RetentativasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
