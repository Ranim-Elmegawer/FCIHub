import { Test, TestingModule } from '@nestjs/testing';
import { SectionTimeController } from './section-time.controller';

describe('SectionTimeController', () => {
  let controller: SectionTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionTimeController],
    }).compile();

    controller = module.get<SectionTimeController>(SectionTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
