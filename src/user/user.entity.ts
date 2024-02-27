import { Role } from "src/role/role.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    lastname: string

    @Column()
    firstname: string

    @Column()
    password: string

    @Column()
    phone: string
    @ManyToOne(() => Role, (role) => role.users)
    role: Role

}