import { Reward } from "src/reward/reward.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'rewardearned' })
export class RewardEarned {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToOne(() => User, (user) => user.rewardEarned)
    user: User

    @ManyToOne(() => Reward, (reward) => reward.rewardEarned)
    reward: Reward

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}