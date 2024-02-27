import { User } from 'src/user/user.entity'
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity({ name: 'role' })
export class Role {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ unique: true })
    name: string

    @OneToMany(() => User, (user) => user.role)
    users: User[]

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

}
