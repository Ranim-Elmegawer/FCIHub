import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseRequest } from './request/create-course.request';
import { Response } from 'express';
import { isValidId } from 'src/validator/is-valid-id.decorator';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('course')
export class CourseController {
    constructor(
        private readonly courseService: CourseService,
    ) {}

    @Post()
    @Public()
    async createCourse(@Body() course: CreateCourseRequest, @Res() res: Response) {
        const createdCourse = await this.courseService.create(course);

        return res.status(201).json({
            message: 'Course created successfully',
            course: createdCourse,
        });
    }

    @Get(':id')
    @Public()
    async getCourse(@isValidId() id: number, @Res() res: Response) {
        const course = await this.courseService.findById(id);

        return res.status(200).json({
            message: 'Course retrieved successfully',
            course,
        });
    }

    @Get()
    @Public()
    async getAllCourses(@Res() res: Response) {
        const courses = await this.courseService.findAll();

        return res.status(200).json({
            message: 'Courses retrieved successfully',
            courses,
        });
    }
}
