import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { MajorService } from './major.service';
import { CreateMajorRequest } from './request/create-major.request';
import { Response } from 'express';
import { isValidId } from 'src/validator/is-valid-id.decorator';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('major')
export class MajorController {
    constructor(
        private readonly majorService: MajorService,
    ){}

    @Post()
    @Public()
    async createMajor(@Body() major: CreateMajorRequest, @Res() res: Response) {
        const createdMajor = await this.majorService.createMajor(major);

        return res.status(201).json({
            message: 'Major created successfully',
            major: createdMajor,
        });
    }

    @Get(':id')
    @Public()
    async getMajor(@isValidId() id: number, @Res() res: Response) {
        const major = await this.majorService.findById(id);

        return res.status(200).json({
            message: 'Major retrieved successfully',
            major,
        });
    }

    @Get()
    @Public()
    async getAllMajors(@Res() res: Response) {
        const majors = await this.majorService.findAll();

        return res.status(200).json({
            message: 'Majors retrieved successfully',
            majors,
        });
    }
}
