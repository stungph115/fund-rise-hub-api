import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'update' })
export class Update {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
}