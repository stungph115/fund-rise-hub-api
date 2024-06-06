import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'socket' })
export class Socket {

    @PrimaryColumn()
    socketId: string

    @ManyToOne(() => User, (user) => user.socket)
    user: User

}