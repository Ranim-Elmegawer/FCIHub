import { LevelEntity } from "src/level/level.entity";
import { MajorEntity } from "src/major/major.entity";
import { MaterialEntity } from "src/material/material.entity";
import { SubMajorEntity } from "src/sub-major/sub-major.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('courses')
export class CourseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => LevelEntity, (level) => level.courses, { onDelete: 'CASCADE' })
    level: LevelEntity;

    @ManyToOne(() => MajorEntity, (major) => major, { nullable: true, onDelete: 'SET NULL' })
    major: MajorEntity;

    @ManyToOne(() => SubMajorEntity, (subMajor) => subMajor, { nullable: true, onDelete: 'SET NULL' })
    subMajor: SubMajorEntity

    @OneToMany(() => MaterialEntity, (material) => material.course, { cascade: true })
    materials: MaterialEntity[];
}