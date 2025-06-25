import { LevelEntity } from "src/level/level.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('major')
export class MajorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @OneToMany(() => LevelEntity, (level) => level.major, { cascade: true })
  levels: LevelEntity[];
}