import { Invest } from "src/invest/invest.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'payment' })
export class Payment {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @OneToOne(() => Invest, (invest) => invest.payment)
    @JoinColumn()
    invest: Invest

    @Column()
    stripId: string

    @Column()
    dateCreated: Date

    @Column()
    dateUpdated: Date

    @Column()
    status: string
}