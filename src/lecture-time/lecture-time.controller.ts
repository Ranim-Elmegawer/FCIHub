import { Body, Controller, Delete, Get, Post, Put, Res } from '@nestjs/common';
import { LectureTimeService } from './lecture-time.service';
import { Response } from 'express';
import { CreateLectureTimeRequest } from './request/create-lecture-time.request';
import { isValidId } from 'src/validator/is-valid-id.decorator';
import { RolesDec } from 'src/auth/decorator/roles.decorator';
import { Roles } from 'src/user/role.enum';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('lecture-time')
export class LectureTimeController {
    constructor(
        private readonly lectureTimeService: LectureTimeService,
    ) { }


    @Post()
    @RolesDec(Roles.ADMIN)
    async createLectureTime(@Body() lectureTime: CreateLectureTimeRequest, @Res() res: Response) {
        const newLectureTime = await this.lectureTimeService.createLectureTime(lectureTime);
        return res.status(201).json({
            message: 'Lecture time created successfully',
            data: newLectureTime,
        });
    }


    @Get()
    @Public()
    async findAllLectureTimes(@Res() res: Response) {
        const lectureTimes = await this.lectureTimeService.findAllLectureTimes();
        return res.status(200).json({
            message: 'Lecture times retrieved successfully',
            data: lectureTimes,
        });
    }

    @Get(':id')
    @Public()
    async findLectureTimeById(@isValidId() id: number, @Res() res: Response) {
        const lectureTime = await this.lectureTimeService.findLectureTimeById(id);
        return res.status(200).json({
            message: 'Lecture time retrieved successfully',
            data: lectureTime,
        });
    }

    @Delete(':id')
    @RolesDec(Roles.ADMIN)
    async deleteLectureTime(@isValidId() id: number, @Res() res: Response) {
        await this.lectureTimeService.deleteLectureTime(id);
        return res.status(200).json({
            message: 'Lecture time deleted successfully',
        });
    }

    @Put(':id')
    @RolesDec(Roles.ADMIN)
    async updateLectureTime(@isValidId() id: number, @Body() lectureTime: CreateLectureTimeRequest, @Res() res: Response) {
        const updatedLectureTime = await this.lectureTimeService.updateLectureTime(id, lectureTime);
        return res.status(200).json({
            message: 'Lecture time updated successfully',
            data: updatedLectureTime,
        });
    }
}
