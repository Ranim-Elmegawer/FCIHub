import { Column, Double, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./role.enum";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    gender: string;

    @Column({ nullable: true })
    collage: string;

    @Column({ nullable: true })
    university: string;

    @Column({ nullable: true })
    level: string;

    @Column({ nullable: true })
    major: string;

    @Column({ nullable: true })
    universityId: number;

    @Column({ type: "decimal", nullable: true })
    GPA: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Roles, default: Roles.USER })
    role: Roles = Roles.USER;

    @Column({ nullable: true })
    resetCode: string;

    @Column({ type: 'timestamp', nullable: true })
    resetCodeExpiresAt: Date;

    @Column({ default: false })
    isResetCodeUsed: boolean;
}