import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'faq' })
export class FaQ {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
}