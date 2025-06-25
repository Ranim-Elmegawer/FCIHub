import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FciEventEntity } from './fci-event.entity';
import { Repository } from 'typeorm';
import { CreateEventRequest } from './request/create-event.request';
import { EventNotFoundException } from './exception/event-not-found.exception';

@Injectable()
export class FciEventService {
    constructor(
        @InjectRepository(FciEventEntity)
        private eventRepository: Repository<FciEventEntity>,
    
    ) { }

    async createEvent(event: CreateEventRequest) {
        const newEvent = this.eventRepository.create(event);
        return this.eventRepository.save(newEvent);
    }

    async findAllEvents() {
        return this.eventRepository.find();
    }

    async findEventById(id: number){
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
