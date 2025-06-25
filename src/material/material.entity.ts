import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MaterialType } from "./enum/material-type.enum";
import { CourseEntity } from "src/course/course.entity";

@Entity('material')
export class MaterialEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({type: 'enum', enum: MaterialType})
    type: MaterialType;

    @Column()
    contentUrl: string; 

    @ManyToOne(() => CourseEntity, (course) => course.materials, {onDelete: 'CASCADE'})
    course: CourseEntity;
}