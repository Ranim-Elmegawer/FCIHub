import { LevelEntity } from "src/level/level.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('sub_major')
export class SubMajorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string; // IS or CS

    @ManyToOne(() => LevelEntity, (level) => level.subMajors, { onDelete: 'CASCADE' })
    level: LevelEntity;
}