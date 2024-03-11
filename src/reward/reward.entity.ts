import { Project } from "src/project/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'reward' })
export class Reward {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToOne(() => Project, (project) => project.reward)
    project: Project

    @Column()
    description: string

    @Column()
    price: number
    
    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}