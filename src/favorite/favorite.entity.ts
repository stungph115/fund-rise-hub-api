import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'favorite' })
export class Favorite {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
}