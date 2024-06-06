import { Conversation } from "src/conversation/conversation.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'message' })
export class Message {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column()
    content: string

    @ManyToOne(() => User, (user) => user.messages)
    user: User

    @Column({ default: 0 })
    read: number

    @ManyToOne(() => Conversation, conversation => conversation.messages)
    conversation: Conversation

    @Column()
    createdAt: Date
}