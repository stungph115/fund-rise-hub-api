import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'campaign' })
export class Campaign {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
}