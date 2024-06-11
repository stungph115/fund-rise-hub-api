import { Project } from "src/project/project.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'comment' })
export class Comment {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToOne(() => Project, (project) => project.comment)
    project: Project

    @Column()
    content: string

    @Column()
    createdAt: Date

    @ManyToOne(() => User, (user) => user.comment)
    sender: User

    @Column()

    updatedAt: Date
}