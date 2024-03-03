import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'conversation' })
export class Conversation {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
}