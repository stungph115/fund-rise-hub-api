import { Category } from "src/category/category.entity";
import { Project } from "src/project/project.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'subcateogry' })
export class SubCategory {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column()
    name: string

    @OneToMany(() => Project, (project) => project.subCategory)
    project: Project[]

    @ManyToOne(() => Category, (category) => category.subCatgory)
    category: Category

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}