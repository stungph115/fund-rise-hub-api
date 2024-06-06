import { FileChat } from "src/file-chat/file-chat.entity";
import { Message } from "src/message/message.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'conversation' })
export class Conversation {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ManyToMany(type => User)
    @JoinTable()
    participants: User[]

    @OneToMany(() => Message, (message) => message.conversation)
    messages: Message[]

    @Column()
    createdAt: Date

    @OneToMany(() => FileChat, (file) => file.conversation)
    file: FileChat[]

}