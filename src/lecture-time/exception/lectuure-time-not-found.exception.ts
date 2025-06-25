import { HttpException, HttpStatus } from '@nestjs/common';

export class LectureTimeNotFoundException extends HttpException {
    constructor(identifier: string | number) {
        const message = `Lecture time with ${typeof identifier === 'number' ? 'ID' : 'name'} '${identifier}' not found`;
        super(message, HttpStatus.NOT_FOUND);
    }
}