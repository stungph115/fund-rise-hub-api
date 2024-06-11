import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
const moment = require('moment')
import { Server } from 'socket.io'
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import Stripe from 'stripe';
import { env } from 'env';
import { User } from 'src/user/user.entity';
import { Invest } from 'src/invest/invest.entity';

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
    async getPaymentsWithInvestments(userId: number) {
        // Get user by ID
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new Error('User not found');
        }

        // Get Stripe ID
        const stripeId = user.stripeId;

        if (!stripeId) {
            throw new Error('User does not have a Stripe ID');
        }

        // Retrieve list of payment intents from Stripe
        const paymentIntents = await this.stripe.paymentIntents.list({
            customer: stripeId,
        });

        // Create a list to hold payment details with investments
        const paymentsWithInvestments = [];

        for (const paymentIntent of paymentIntents.data) {
            const detailedPaymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntent.id);
            const paymentMethod = detailedPaymentIntent.payment_method
                ? await this.stripe.paymentMethods.retrieve(detailedPaymentIntent.payment_method)
                : null;
            const cardDetails = paymentMethod && paymentMethod.card ? paymentMethod.card : null;

            // Find the payment entity in the database
            const payment = await this.paymentRepository.findOne({
                where: { stripId: paymentIntent.id },
                relations: {
                    invest: { project: true }
                }
            });

            if (payment) {
                payment.paymentMethod = cardDetails ? `${cardDetails.brand} ****${cardDetails.last4}` : null;
                paymentsWithInvestments.push(payment);

            } else {
                // If no payment entity exists, create a new one with default values
                const newPayment = this.paymentRepository.create({
                    stripId: paymentIntent.id,
                    dateCreated: new Date(paymentIntent.created * 1000),
                    dateUpdated: new Date(paymentIntent.created * 1000),
                    status: paymentIntent.status,
                    invest: null,
                    paymentMethod: cardDetails ? `${cardDetails.brand} ****${cardDetails.last4}` : null,
                });

                paymentsWithInvestments.push(newPayment);
            }
        }

        return paymentsWithInvestments;
    }
}
