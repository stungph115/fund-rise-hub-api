import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'filechat' })
export class FileChat {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
}