import { Project } from "src/project/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'campaign' })
export class Campaign {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToOne(() => Project, (project) => project.campaign)
    project: Project

    @Column()
    title: string

    @Column('mediumtext')
    content: string

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}