import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'comment' })
export class Comment {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
}