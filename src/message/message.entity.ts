import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'message' })
export class Message {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
}