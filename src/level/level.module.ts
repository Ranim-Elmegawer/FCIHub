import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from './level.entity';
import { MajorEntity } from 'src/major/major.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LevelEntity, MajorEntity])],
  providers: [LevelService],
  controllers: [LevelController]
})
export class LevelModule {}
