import { HttpException, HttpStatus } from '@nestjs/common';

export class LevelNotFoundException extends HttpException {
    constructor(identifier: string | number) {
        const message = `Level with ${typeof identifier === 'number' ? 'ID' : 'name'} '${identifier}' not found`;
        super(message, HttpStatus.NOT_FOUND);
    }
}