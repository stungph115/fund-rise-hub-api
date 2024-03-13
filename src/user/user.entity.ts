import { AddonsEarned } from "src/addons-earned/addons-earned.entity";
import { Favorite } from "src/favorite/favorite.entity";
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

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}