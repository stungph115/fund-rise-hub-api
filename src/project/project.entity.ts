import { Campaign } from "src/campaign/campaign.entity";
import { Category } from "src/category/category.entity";
import { Comment } from "src/comment/comment.entity";
import { FaQ } from "src/faq/faq.entity";
import { Favorite } from "src/favorite/favorite.entity";
import { Reward } from "src/reward/reward.entity";
import { Update } from "src/update/update.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'project' })
export class Project {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToOne(() => User, (user) => user.project)
    userCreator: User

    @Column()
    goal: number

    @Column()
    date: Date

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

    @ManyToOne(() => Category, (category) => category.project)
    category: Category

    @ManyToOne(() => Category, (category) => category.project)
    subCategory: Category

    @OneToMany(() => Favorite, (favorite) => favorite.project)
    favorites: Favorite[]

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

}
