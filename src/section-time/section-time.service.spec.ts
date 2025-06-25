import { Test, TestingModule } from '@nestjs/testing';
import { SectionTimeService } from './section-time.service';

describe('SectionTimeService', () => {
  let service: SectionTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionTimeService],
    }).compile();

    service = module.get<SectionTimeService>(SectionTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
