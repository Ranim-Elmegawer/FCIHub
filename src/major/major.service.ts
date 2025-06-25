import { Injectable } from '@nestjs/common';
import { MajorEntity } from './major.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMajorRequest } from './request/create-major.request';
import { MajorNotFoundException } from './exception/major-not-found.exception';

@Injectable()
export class MajorService {
    constructor(
        @InjectRepository(MajorEntity)
        private readonly majorRepository: Repository<MajorEntity>,
    ){}

    async createMajor(major: CreateMajorRequest): Promise<MajorEntity> {
        const newMajor = this.majorRepository.create(major);
        return this.majorRepository.save(newMajor);
    }

    async findAll(): Promise<MajorEntity[]> {
        return this.majorRepository.find();
    }

    async findById(id: number): Promise<MajorEntity> {
        const major = await this.majorRepository.findOne({ where: { id } });
        if (!major) {
            throw new MajorNotFoundException(id);
        }
        return major;
    }
}
