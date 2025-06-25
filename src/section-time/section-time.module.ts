import { Module } from '@nestjs/common';
import { SectionTimeController } from './section-time.controller';
import { SectionTimeService } from './section-time.service';

@Module({
  controllers: [SectionTimeController],
  providers: [SectionTimeService]
})
export class SectionTimeModule {}
