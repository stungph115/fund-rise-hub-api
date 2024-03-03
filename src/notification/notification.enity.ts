
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'notification' })
export class Notification {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
}