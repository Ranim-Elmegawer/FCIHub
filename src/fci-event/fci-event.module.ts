import { Module } from '@nestjs/common';
import { FciEventController } from './fci-event.controller';
import { FciEventService } from './fci-event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FciEventEntity } from './fci-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FciEventEntity])],
  controllers: [FciEventController],
  providers: [FciEventService]
})
export class FciEventModule {}
