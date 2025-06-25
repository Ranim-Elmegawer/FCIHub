import { Test, TestingModule } from '@nestjs/testing';
import { LectureTimeController } from './lecture-time.controller';

describe('LectureTimeController', () => {
  let controller: LectureTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectureTimeController],
    }).compile();

    controller = module.get<LectureTimeController>(LectureTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
