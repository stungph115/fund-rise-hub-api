import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'project' })
export class Project {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
}
