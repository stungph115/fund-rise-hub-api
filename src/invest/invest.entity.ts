import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToOne } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Project } from 'src/project/project.entity';
import { Payment } from 'src/payment/payment.entity';

@Entity({ name: 'invest' })
export class Invest {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(() => User, (user) => user.investments)
    user: User;

    @ManyToOne(() => Project, (project) => project.investments)
    project: Project;

    @Column()
    amount: number;

    @OneToOne(() => Payment, (payment) => payment.invest)
    payment: Payment;

    @CreateDateColumn()
    createdAt: Date;
}
