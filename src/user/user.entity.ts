import { AddonsEarned } from "src/addons-earned/addons-earned.entity";
import { Favorite } from "src/favorite/favorite.entity";
import { Follow } from "src/follow/follow.entity";
import { Message } from "src/message/message.entity";
import { Notification } from "src/notification/notification.entity";
import { Project } from "src/project/project.entity";
import { RewardEarned } from "src/reward-earned/reward-earned.entity";
import { Role } from "src/role/role.entity";
import { Update } from "src/update/update.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    lastname: string

    @Column()
    firstname: string

    @Column()
    password: string

    @Column()
    phone: string

    @Column({ nullable: true })
    photo: string

    @Column({ nullable: true })
    stripeId: string

    @ManyToOne(() => Role, (role) => role.users)
    role: Role

    @OneToMany(() => RewardEarned, (rewardEarned) => rewardEarned.user)
    rewardEarned: RewardEarned[]

    @OneToMany(() => AddonsEarned, (addonsEarned) => addonsEarned.user)
    addonsEarned: AddonsEarned[]

    @OneToMany(() => Update, (update) => update.userCreator)
    update: Update[]

    @OneToMany(() => Project, (project) => project.userCreator)
    project: Project[]

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    favorites: Favorite[]

    @OneToMany(() => Follow, (follow) => follow.following)
    following: Follow[]

    @OneToMany(() => Follow, (follow) => follow.follower)
    follower: Follow[]

    @OneToMany(() => Message, (messages) => messages.user)
    messages: Message[]

    @OneToMany(() => Notification, (notification) => notification.user)
    notification: Notification[]

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}