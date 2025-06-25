import { Module } from '@nestjs/common';
import { LectureTimeController } from './lecture-time.controller';
import { LectureTimeService } from './lecture-time.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureTimeEntity } from './lecture-time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LectureTimeEntity])],
  controllers: [LectureTimeController],
  providers: [LectureTimeService]
})
export class LectureTimeModule {}
