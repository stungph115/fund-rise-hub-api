import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'reward' })
export class Reward {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
}