import { Project } from "src/project/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'faq' })
export class FaQ {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToOne(() => Project, (project) => project.faq)
    project: Project

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}