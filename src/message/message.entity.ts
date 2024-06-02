import { Conversation } from "src/conversation/conversation.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'message' })
export class Message {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
    @Column()
    content: string;

    @ManyToOne(() => Conversation, conversation => conversation.messages)
    conversation: Conversation;
}