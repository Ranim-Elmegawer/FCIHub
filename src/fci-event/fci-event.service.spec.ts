import { Test, TestingModule } from '@nestjs/testing';
import { FciEventService } from './fci-event.service';

describe('FciEventService', () => {
  let service: FciEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FciEventService],
    }).compile();

    service = module.get<FciEventService>(FciEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
