import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'addonsearned' })
export class AddonsEarned {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
}