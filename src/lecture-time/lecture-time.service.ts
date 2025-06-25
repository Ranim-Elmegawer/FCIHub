import { InjectRepository } from '@nestjs/typeorm';
import { LectureTimeEntity } from './lecture-time.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateLectureTimeRequest } from './request/create-lecture-time.request';
import { LectureTimeNotFoundException } from './exception/lectuure-time-not-found.exception';
import { promises } from 'dns';

@Injectable()
export class LectureTimeService {
    constructor(
        @InjectRepository(LectureTimeEntity)
        private lectureTimeRepository: Repository<LectureTimeEntity>,
    ) { }


    async createLectureTime(lectureTime: CreateLectureTimeRequest) {
        lectureTime.rangeTime = this.toArabicNumber(lectureTime.rangeTime);
        const newLectureTime = this.lectureTimeRepository.create(lectureTime);
        return this.lectureTimeRepository.save(newLectureTime);
    }

    async findAllLectureTimes() {
        return this.lectureTimeRepository.find();
    }

    async findLectureTimeById(id: number) {
        const lectureTime = await this.lectureTimeRepository.findOne({ where: { id } });
        if (!lectureTime) {
            throw new LectureTimeNotFoundException(id);
        }
        return lectureTime;
    }

    async deleteLectureTime(id: number) {
        await this.findLectureTimeById(id);
        await this.lectureTimeRepository.delete(id);
    }

    async updateLectureTime(id: number, lectureTime: CreateLectureTimeRequest) {
        await this.findLectureTimeById(id);
        lectureTime.rangeTime = this.toArabicNumber(lectureTime.rangeTime);
        await this.lectureTimeRepository.update(id, lectureTime);
        return this.findLectureTimeById(id);
    }

    private toArabicNumber(str): string {
        const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return str.replace(/\d/g, d => arabicDigits[d]);
    }




}
