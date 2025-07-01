import { Body, Controller, Delete, Get, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FciEventService } from './fci-event.service';
import { CreateEventRequest } from './request/create-event.request';
import { Response } from 'express';
import { isValidId } from 'src/validator/is-valid-id.decorator';
import { RolesDec } from 'src/auth/decorator/roles.decorator';
import { Roles } from 'src/user/role.enum';
import { Public } from 'src/auth/decorator/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import { FilterEventRequest } from './request/filter-event.request';

@Controller('event')
export class FciEventController {
    constructor(
        private readonly fciEventService: FciEventService,
    ) { }


    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: memoryStorage(),
    }))
    @RolesDec(Roles.ADMIN)
    async createEvent(@Body() event: CreateEventRequest, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        const newEvent = await this.fciEventService.createEvent(event, file);
        return res.status(201).json({
            message: 'Event created successfully',
            data: newEvent,
        });
    }

    @Get()
    @Public()
    async findAllEvents(@Query() filter: FilterEventRequest, @Res() res: Response) {
        const events = await this.fciEventService.findAllEvents(filter);
        return res.status(200).json({
            message: 'Events retrieved successfully',
            data: events,
        });
    }

    @Get(':id')
    @Public()
    async findEventById(@isValidId() id: number, @Res() res: Response) {
        const event = await this.fciEventService.findEventById(id);
        return res.status(200).json({
            message: 'Event retrieved successfully',
            data: event,
        });
    }

    @Delete(':id')
    @RolesDec(Roles.ADMIN)
    async deleteEvent(@isValidId() id: number, @Res() res: Response) {
        await this.fciEventService.deleteEvent(id);
        return res.status(200).json({
            message: 'Event deleted successfully',
        });
    }


}
