import { Test, TestingModule } from '@nestjs/testing';
import { FciEventController } from './fci-event.controller';

describe('FciEventController', () => {
  let controller: FciEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FciEventController],
    }).compile();

    controller = module.get<FciEventController>(FciEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
