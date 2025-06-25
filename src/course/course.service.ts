import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { LevelEntity } from 'src/level/level.entity';
import { MajorEntity } from 'src/major/major.entity';
import { SubMajorEntity } from 'src/sub-major/sub-major.entity';
import { CreateCourseRequest } from './request/create-course.request';
import { LevelNotFoundException } from 'src/level/exception/level-not-found.exception';
import { Repository } from 'typeorm';
import { CourseNotFoundException } from './exception/course-not-found.exception';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>,

        @InjectRepository(LevelEntity)
        private readonly levelRepository: Repository<LevelEntity>,

        @InjectRepository(MajorEntity)
        private readonly majorRepository: Repository<MajorEntity>,

        @InjectRepository(SubMajorEntity)
        private readonly subMajorRepository: Repository<SubMajorEntity>,
    ) { }

    async create(dto: CreateCourseRequest) {
        const level = await this.levelRepository.findOne({
            where: { id: dto.levelId },
            relations: ['major'],
        });

        if (!level) throw new LevelNotFoundException(dto.levelId);

        const course = this.courseRepository.create({ title: dto.title, level });

        if (level.major.title === 'General' && [3, 4].includes(level.levelNumber)) {
            if (!dto.subMajorId)
                throw new BadRequestException('SubMajor required for General Level 3/4');

            const subMajor = await this.subMajorRepository.findOneBy({ id: dto.subMajorId });

            if (!subMajor)
                throw new NotFoundException('SubMajor not found');

            course.subMajor = subMajor;
        } else {
            if (!dto.majorId)
                throw new BadRequestException('Major is required for this course');

            const major = await this.majorRepository.findOneBy({ id: dto.majorId });

            if (!major) throw new NotFoundException('Major not found');

            course.major = major;
        }

        return this.courseRepository.save(course);
    }

    async findAll() {
        return this.courseRepository.find({
            relations: ['level', 'major', 'subMajor'],
        });
    }

    async findById(id: number) {
        const course = await this.courseRepository.findOne({
            where: { id },
            relations: ['level', 'major', 'subMajor'],
        });

        if (!course) throw new CourseNotFoundException(id);

        return course;
    }
}
