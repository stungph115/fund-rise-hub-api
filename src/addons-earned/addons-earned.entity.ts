import { Addons } from "src/addons/addons.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'addonsearned' })
export class AddonsEarned {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToOne(() => User, (user) => user.addonsEarned)
    user: User

    @ManyToOne(() => Addons, (addons) => addons.addonsEarned)
    addons: Addons

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}