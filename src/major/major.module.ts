import { Module } from '@nestjs/common';
import { MajorService } from './major.service';
import { MajorController } from './major.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MajorEntity } from './major.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MajorEntity])],
  providers: [MajorService],
  controllers: [MajorController],
  exports: [MajorService],
})
export class MajorModule {}
