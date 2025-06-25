import { HttpException, HttpStatus } from '@nestjs/common';

export class MajorNotFoundException extends HttpException {
    constructor(identifier: string | number) {
        const message = `Major with ${typeof identifier === 'number' ? 'ID' : 'name'} '${identifier}' not found`;
        super(message, HttpStatus.NOT_FOUND);
    }
}