import { Project } from "src/project/project.entity";
import { RewardEarned } from "src/reward-earned/reward-earned.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'reward' })
export class Reward {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToOne(() => Project, (project) => project.reward)
    project: Project

    @Column()
    title: string

    @Column()
    description: string

    @Column({ nullable: true })
    photo: string

    @Column()
    price: number

    @OneToMany(() => RewardEarned, (rewardEarned) => rewardEarned.reward)
    rewardEarned: RewardEarned[]

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

}