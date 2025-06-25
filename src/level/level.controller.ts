import { Body, Controller, Get, Post, Redirect, Res } from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelRequest } from './request/create-level.request';
import { Response } from 'express';
import { isValidId } from 'src/validator/is-valid-id.decorator';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('level')
export class LevelController {
    constructor(
        private readonly levelService: LevelService
    ) { }

    @Post()
    @Public()
    async createLevel(@Body() level: CreateLevelRequest, @Res() res: Response) {
        const newLevel = await this.levelService.create(level);
        res.status(201).json(newLevel);
    }

    @Get()
    @Public()
    async findAll() {
        return this.levelService.findAll();
    }

    @Get(':id')
    @Public()
    async findById(@isValidId() id: number) {
        return this.levelService.findById(id);
    }
}
