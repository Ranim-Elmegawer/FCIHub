import { Module } from '@nestjs/common';
import { SubMajorController } from './sub-major.controller';
import { SubMajorService } from './sub-major.service';
import { SubMajorEntity } from './sub-major.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from 'src/level/level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubMajorEntity, LevelEntity])],
  controllers: [SubMajorController],
  providers: [SubMajorService]
})
export class SubMajorModule {}
