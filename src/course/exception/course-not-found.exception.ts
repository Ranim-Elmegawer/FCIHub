import { HttpException, HttpStatus } from '@nestjs/common';

export class CourseNotFoundException extends HttpException {
    constructor(identifier: string | number) {
        const message = `Course with ${typeof identifier === 'number' ? 'ID' : 'name'} '${identifier}' not found`;
        super(message, HttpStatus.NOT_FOUND);
    }
}