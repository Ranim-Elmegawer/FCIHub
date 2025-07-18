import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('fci_event')
export class FciEventEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    imageUrl: string;
    
    @CreateDateColumn()
    createdAt: Date;
}