import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubMajorEntity } from './sub-major.entity';
import { Repository } from 'typeorm';
import { LevelEntity } from 'src/level/level.entity';
import { CreateSubMajorRequest } from './request/create-sub-major.request';
import { LevelNotFoundException } from 'src/level/exception/level-not-found.exception';

@Injectable()
export class SubMajorService {
    constructor(
        @InjectRepository(SubMajorEntity)
        private subMajorRepository: Repository<SubMajorEntity>,
        @InjectRepository(LevelEntity)
        private levelRepository: Repository<LevelEntity>
    ) { }

    async create(subMajor: CreateSubMajorRequest) {
        const level = await this.levelRepository.findOne({
            where: { id: subMajor.levelId },
            relations: ['major'],
        });

        if (!level) throw new LevelNotFoundException(subMajor.levelId);

        const isValid =
            level.major.title === 'General' && (level.levelNumber === 3 || level.levelNumber === 4);

        if (!isValid) {
            throw new BadRequestException('SubMajors are allowed only for General Major at Level 3 or 4');
        }

        const NewsubMajor = this.subMajorRepository.create({
            title: subMajor.title,
            level,
        });

        return this.subMajorRepository.save(NewsubMajor);
    }

    async findAll() {
        return this.subMajorRepository.find({ relations: ['level', 'level.major'] });
    }


    async findById(id: number) {
        const subMajor = await this.subMajorRepository.findOne({
            where: { id },
            relations: ['level', 'level.major'],
        });
        if (!subMajor) throw new LevelNotFoundException(id);
        return subMajor;
    }
}
