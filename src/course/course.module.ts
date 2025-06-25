import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { LevelEntity } from 'src/level/level.entity';
import { MajorEntity } from 'src/major/major.entity';
import { SubMajorEntity } from 'src/sub-major/sub-major.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, LevelEntity, MajorEntity, SubMajorEntity])],
  providers: [CourseService],
  controllers: [CourseController]
})
export class CourseModule {}
