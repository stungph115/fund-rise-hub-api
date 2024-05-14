import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { env } from 'env';
import { User } from 'src/user/user.entity';
import Stripe from 'stripe';
import { Repository } from 'typeorm';

@Injectable()
export class CardPaymentService {
    private stripe
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,

    ) {
        this.stripe = new Stripe(env.STRIPE_API_SECRET_KEY, {
            apiVersion: '2023-10-16',
        })
    }
    async getCards(id: number) {
        const customer = await this.userRepository.findOneBy({ id: id })

        if (!customer) {
            throw new HttpException('USER_NOT_Found', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        try {
            const stripeCustomer = await this.stripe.customers.retrieve(customer.stripeId)
            const paymentMethods = await this.stripe.paymentMethods.list({
                type: 'card',
                customer: stripeCustomer.id
            })
            const cards = paymentMethods.data.map(card => ({
                id: card.id,
                display_brand: card.card.display_brand,
                exp_month: card.card.exp_month,
                exp_year: card.card.exp_year,
                last4: card.card.last4,
                default: stripeCustomer.invoice_settings.default_payment_method === card.id ? true : false
            }))
            return {
                statusCode: 200,
                entity: cards
            }
        } catch (error) {
            throw new HttpException("STRIPE_ERROR_" + error.raw.code, HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }
    async attachCardToCustomerStripe(params: any) {
        const customer = await this.userRepository.findOneBy({ id: params.id })
        if (!customer) {
            throw new HttpException('USER_NOT_Found', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        try {
            const attachedPM = await this.stripe.paymentMethods.attach(
                params.paymentMethod,
                {
                    customer: customer.stripeId,
                }
            )
            return {
                statusCode: 200,
            }
        } catch (error) {
            console.log("STRIPE_ERROR_", error)
            throw new HttpException("STRIPE_ERROR_" + error.raw.code, HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    async setCardDefault(params: any) {
        const customer = await this.userRepository.findOneBy({ id: params.id })
        if (!customer) {
            throw new HttpException('USER_NOT_Found', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        try {
            const updateDPM = await this.stripe.customers.update(customer.stripeId, {
                invoice_settings: {
                    default_payment_method: params.paymentMethod
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    async deleteCard(paymentMethod: string) {
        try {
            const deleteCard = await this.stripe.paymentMethods.detach(paymentMethod)
            console.log(deleteCard)
            return 200
        } catch (error) {
            console.log(error)
            throw new HttpException("STRIPE_ERROR_" + error.raw.code, HttpStatus.UNPROCESSABLE_ENTITY)

        }
    }
}
