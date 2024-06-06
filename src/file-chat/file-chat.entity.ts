import { Conversation } from "src/conversation/conversation.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'filechat' })
export class FileChat {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column()
    name: string

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => Conversation, (conversation) => conversation.file)
    conversation: Conversation

    @Column()
    createdAt: Date

    @Column()
    size: Number

    @Column()
    read: Number
}