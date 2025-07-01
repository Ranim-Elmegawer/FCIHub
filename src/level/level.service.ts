import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelEntity } from './level.entity';
import { Repository } from 'typeorm';
import { MajorEntity } from 'src/major/major.entity';
import { CreateLevelRequest } from './request/create-level.request';
import { MajorNotFoundException } from 'src/major/exception/major-not-found.exception';

@Injectable()
export class LevelService {
    constructor(
        @InjectRepository(LevelEntity)
        private levelRepository: Repository<LevelEntity>,
        @InjectRepository(MajorEntity)
        private majorRepository: Repository<MajorEntity>
    ) { }

    async create(level: CreateLevelRequest) {
        const major = await this.majorRepository.findOne({ where: { id: level.majorId } });
        if (!major) throw new MajorNotFoundException(level.majorId);

        const newLevel = this.levelRepository.create({
            levelNumber: level.levelNumber,
            major: major
        });

        return this.levelRepository.save(newLevel);
    }

    async findAll() {
        return this.levelRepository.find({ relations: ['major'] });
    }

    async findById(id: number) {
        const level = await this.levelRepository.findOne({ where: { id }, relations: ['major'] });
        console.error(level);
        if (!level) throw new MajorNotFoundException(id);
        return level;
    }
}
