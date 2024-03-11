import { Project } from "src/project/project.entity";
import { SubCategory } from "src/sub-category/sub-category.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cateogry' })
export class Category {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column()
    name: string

    @OneToMany(() => Project, (project) => project.category)
    project: Project[]

    @OneToMany(() => SubCategory, (subCatgory) => subCatgory.category)
    subCatgory: SubCategory[]

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}