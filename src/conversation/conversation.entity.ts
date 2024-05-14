import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'conversation' })
export class Conversation {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
    @ManyToOne(() => User, user => user.following)
    user1: User

    @ManyToOne(() => User, user => user.follower)
    user2: User

    @Column()
    createdAt: Date

}