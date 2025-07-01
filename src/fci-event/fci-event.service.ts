import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FciEventEntity } from './fci-event.entity';
import { ILike, Repository } from 'typeorm';
import { CreateEventRequest } from './request/create-event.request';
import { EventNotFoundException } from './exception/event-not-found.exception';
import { DropboxService } from 'src/dropbox/dropbox.service';
import { FilterEventRequest } from './request/filter-event.request';

@Injectable()
export class FciEventService {
    constructor(
        @InjectRepository(FciEventEntity)
        private eventRepository: Repository<FciEventEntity>,
        private readonly dropboxService: DropboxService,

    ) { }

    async createEvent(event: CreateEventRequest, file?: Express.Multer.File) {
        if (file) {
            const imageUrl = await this.dropboxService.uploadFile(file, `fci-event`);
            console.log('Image uploaded to Dropbox:', imageUrl);
            event.imageUrl = imageUrl;
        }

        const newEvent = this.eventRepository.create(event);
        return this.eventRepository.save(newEvent);
    }

    async findAllEvents(filter: FilterEventRequest) {
        const where: any = {};

        if (filter.title) {
            where.title = ILike(`%${filter.title}%`);
        }

        if (filter.description) {
            where.description = ILike(`%${filter.description}%`);
        }

        if (filter.date) {
            where.date = new Date(filter.date);
        }
        
        if (filter.type) {
            where.type = filter.type;
        }

        return this.eventRepository.find({ where });
    }


    async findEventById(id: number) {
        const event = await this.eventRepository.findOne({ where: { id } });
        if (!event) {
            throw new EventNotFoundException(id);
        }
        return event;
    }

    async deleteEvent(id: number) {
        await this.findEventById(id);
        await this.eventRepository.delete(id);
    }


}
