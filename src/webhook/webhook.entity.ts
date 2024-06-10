
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'event' })
export class Event {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column()
    idStripe: string

    @Column()
    type: string

    @Column()
    dateCreated: Date
}
