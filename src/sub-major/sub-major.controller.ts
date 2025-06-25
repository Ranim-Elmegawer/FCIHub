import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { SubMajorService } from './sub-major.service';
import { CreateSubMajorRequest } from './request/create-sub-major.request';
import { Response } from 'express';
import { isValidId } from 'src/validator/is-valid-id.decorator';

@Controller('sub-major')
export class SubMajorController {
    constructor(
        private readonly subMajorService: SubMajorService,
    ) {}

    @Post()
    async createSubMajor(@Body() subMajor: CreateSubMajorRequest, @Res() res: Response) {
        const newSubMajor = await this.subMajorService.create(subMajor);
        res.status(201).json(newSubMajor);
    }

    @Get()
    async findAll() {
        return this.subMajorService.findAll();
    }

    @Get(':id')
    async findById(@isValidId() id: number) {
        return this.subMajorService.findById(id);
    }
}
