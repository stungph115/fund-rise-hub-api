import { Project } from "src/project/project.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'favorite' })
export class Favorite {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToOne(() => User, user => user.favorites)
    user: User

    @ManyToOne(() => Project, project => project.favorites)
    project: Project

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}