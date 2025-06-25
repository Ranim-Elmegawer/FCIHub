import { HttpException, HttpStatus } from '@nestjs/common';

export class EventNotFoundException extends HttpException {
    constructor(identifier: string | number) {
        const message = `Event with ${typeof identifier === 'number' ? 'ID' : 'name'} '${identifier}' not found`;
        super(message, HttpStatus.NOT_FOUND);
    }
}