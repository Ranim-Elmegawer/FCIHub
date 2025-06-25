import { CourseEntity } from "src/course/course.entity";
import { MajorEntity } from "src/major/major.entity";
import { SubMajorEntity } from "src/sub-major/sub-major.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('level')
export class LevelEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    levelNumber: number; // 1, 2, 3, 4

    @ManyToOne(() => MajorEntity, (major) => major.levels, { onDelete: 'CASCADE' })
    major: MajorEntity;

    @OneToMany(() => SubMajorEntity, (subMajor) => subMajor.level, { cascade: true })
    subMajors: SubMajorEntity[];

    @OneToMany(() => CourseEntity, (course) => course.level, { cascade: true })
    courses: CourseEntity[];
}