import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'follow' })
export class Follow {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToOne(() => User, user => user.following)
    following: User

    @ManyToOne(() => User, user => user.follower)
    follower: User

    @Column()
    createdAt: Date
}