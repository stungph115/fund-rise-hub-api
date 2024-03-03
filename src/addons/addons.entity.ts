import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'addons' })
export class Addons {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
}