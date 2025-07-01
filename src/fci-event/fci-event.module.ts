import { Module } from '@nestjs/common';
import { FciEventController } from './fci-event.controller';
import { FciEventService } from './fci-event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FciEventEntity } from './fci-event.entity';
import { DropboxModule } from 'src/dropbox/dropbox.module';

@Module({
  imports: [TypeOrmModule.forFeature([FciEventEntity]), DropboxModule],
  controllers: [FciEventController],
  providers: [FciEventService]
})
export class FciEventModule {}
