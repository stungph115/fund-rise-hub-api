import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from './project.entity';

@Entity({ name: 'project_photos' })
export class ProjectPhotos {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Project, (project) => project.photos)
    project: Project;
}
