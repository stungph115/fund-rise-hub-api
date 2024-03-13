import { Project } from "src/project/project.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'update' })
export class Update {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToOne(() => Project, (project) => project.update)
    project: Project

    @Column('mediumtext')
    content: string

    @ManyToOne(()=> User,(user)=>user.update)
    userCreator: User
    
    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}