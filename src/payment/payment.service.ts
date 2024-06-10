import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
const moment = require('moment')
import { Server } from 'socket.io'
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import Stripe from 'stripe';
import { env } from 'env';
import { User } from 'src/user/user.entity';

@Injectable()
export class PaymentService {
    private stripe
    private socketServer: Server

    constructor(
        @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
        @InjectRepository(User) private userRepository: Repository<User>,

    ) {
        this.stripe = new Stripe(env.STRIPE_API_SECRET_KEY, {
            apiVersion: '2023-10-16',
        })
    }
    setSocketServer(socketServer: Server) {
        this.socketServer = socketServer
    }

    async createPayment(paymentData: any) {
        const user = await this.userRepository.findOneBy({ id: paymentData.userId })
        if (!user) {
            throw new HttpException('CUSTOMER_NOT_FOUND', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: paymentData.montant,
                currency: 'eur',
                customer: user.stripeId,
            })
            const paymentCreate = this.paymentRepository.create({
                stripId: paymentIntent.id,
                dateCreated: Date(),
                dateUpdated: Date(),
                status: 'unpaid'

            })
            const paymentSave = await this.paymentRepository.save(paymentCreate)
            if (!paymentSave) {
                throw new HttpException('ERROR_PAYMENT_CREATE', HttpStatus.INTERNAL_SERVER_ERROR)
            }
            return {
                statusCode: 201,
                paymentData: {
                    paymentId: paymentSave.id,
                    clientSecret: paymentIntent.client_secret,
                }
            }
        } catch (error) {
            throw new HttpException("STRIPE_ERROR_" + error.raw.code, HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }
    async updateStatus(status: string, idStripe: string) {
        const payment = await this.paymentRepository.findOne({ where: { stripId: idStripe } })
        if (!payment) {
            return
        }
        payment.status = status
        payment.dateUpdated = new Date()
        const paymentUpdate = await this.paymentRepository.save(payment)
        if (!paymentUpdate) {
            throw new HttpException("ERROR_PAYMENT_UPDATE", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        /* this.socketServer.emit('PAYMENT_UPDATED_' + payment.id) */
    }

    async getPayments() {
        const payments = await this.paymentRepository.find()
        return payments
    }
}
