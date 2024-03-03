import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'file' })
export class File {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
}