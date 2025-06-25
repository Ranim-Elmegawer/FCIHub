import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('lecture_time')
export class LectureTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    courseName: string;

    @Column()
    DoctorName: string;

    @Column()
    rangeTime: string;
}