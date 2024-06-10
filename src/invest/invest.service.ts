import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invest } from './invest.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Payment } from 'src/payment/payment.entity';
import { Project } from 'src/project/project.entity';

@Injectable()
export class InvestService {
    constructor(
        @InjectRepository(Invest) private investRepository: Repository<Invest>,
        @InjectRepository(Project) private projectRepository: Repository<Project>,
        @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
        @InjectRepository(User) private userRepository: Repository<User>,

    ) { }

    async createInvest(params: any) {
        const user = await this.userRepository.findOneBy({ id: params.userId })
        if (!user) {
            throw new HttpException('USER_NOT_Found', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const payment = await this.paymentRepository.findOneBy({ id: params.paymentId })
        if (!payment) {
            throw new HttpException('PAYMENT_NOT_Found', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const project = await this.projectRepository.findOneBy({ id: params.projectId })
        if (!project) {
            throw new HttpException('PROJECT_NOT_Found', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const newInvest = this.investRepository.create({
            user: user,
            project: project,
            amount: params.amount,
            payment: payment,
            createdAt: new Date()
        })
        const investSave = await this.investRepository.save(newInvest)
        if (!investSave) {
            throw new HttpException("ERROR_INVEST_SAVE", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return 201
    }
}
