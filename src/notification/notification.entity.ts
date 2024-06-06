import { User } from "src/user/user.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'notification' })
export class Notification {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column('text')
    content: string

    @Column()
    read: number

    @ManyToOne(() => User, (user) => user.notification)
    user: User

    @Column()
    createdAt: Date

    @Column()
    path: string
}