import { AddonsEarned } from "src/addons-earned/addons-earned.entity";
import { Reward } from "src/reward/reward.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'addons' })
export class Addons {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToOne(() => Reward, (reward) => reward.addons)
    reward: Reward

    @Column()
    title: string

    @Column()
    description: string

    @Column({ nullable: true })
    photo: string

    @Column()
    price: number

    @OneToMany(() => AddonsEarned, (addonsEarned) => addonsEarned.addons)
    addonsEarned: AddonsEarned[]

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}