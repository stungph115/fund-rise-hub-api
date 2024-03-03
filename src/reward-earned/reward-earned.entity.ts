import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'rewardearned' })
export class RewardEarned {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
}