import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Campaign } from "src/campaign/campaign.entity";
import { Category } from "src/category/category.entity";
import { Comment } from "src/comment/comment.entity";
import { FaQ } from "src/faq/faq.entity";
import { Favorite } from "src/favorite/favorite.entity";
import { Reward } from "src/reward/reward.entity";
import { Update } from "src/update/update.entity";
import { User } from "src/user/user.entity";
import { ProjectPhotos } from "./projectPhotos.entity";
import { Invest } from "src/invest/invest.entity";

@Entity({ name: 'project' })
export class Project {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToOne(() => User, (user) => user.project)
    userCreator: User

    @ManyToOne(() => Category, (category) => category.project)
    category: Category

    @ManyToOne(() => Category, (category) => category.project)
    subCategory: Category

    @Column()
    title: string

    @Column()
    descriptions: string

    @Column()
    goal: number

    @Column()
    deadline: Date

    @Column()
    status: string

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

    @OneToMany(() => Campaign, (campaign) => campaign.project)
    campaign: Campaign[]

    @OneToMany(() => Reward, (reward) => reward.project)
    reward: Reward[]

    @OneToMany(() => FaQ, (faq) => faq.project)
    faq: FaQ[]

    @OneToMany(() => Update, (update) => update.project)
    update: Update[]

    @OneToMany(() => Comment, (comment) => comment.project)
    comment: Comment[]

    @OneToMany(() => Favorite, (favorite) => favorite.project)
    favorites: Favorite[]

    @OneToMany(() => ProjectPhotos, (projectPhotos) => projectPhotos.project)
    photos: ProjectPhotos[]

    @OneToMany(() => Invest, (invest) => invest.project)
    investments: Invest[]
}
