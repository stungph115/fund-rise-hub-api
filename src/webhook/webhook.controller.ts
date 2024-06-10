import { Controller, Post, Req, Res, Get, Param, ParseIntPipe } from '@nestjs/common'
import { WebhookService } from './webhook.service'
import { Request, Response } from 'express'
/* import { CommandeService } from 'src/commande/commande.service'
import { SubscriptionService } from 'src/subscription/subscription.service' */
import { MailerService } from 'src/mailer/mailer.service'
import * as moment from 'moment'
import { PaymentService } from 'src/payment/payment.service'

@Controller('webhook')
export class WebhookController {
    constructor(
        private readonly stripeService: WebhookService,
        /* private commandeService: CommandeService,
        private subscriptionService: SubscriptionService, */
        private paymentService: PaymentService,
    ) { }

    @Post()
    async handleWebhook(@Req() req: Request, @Res() res: Response) {
        let sig: string
        if (Array.isArray(req.headers['stripe-signature'])) {
            sig = req.headers['stripe-signature'][0]
        } else {
            sig = req.headers['stripe-signature'] as string
        }

        try {
            const event = await this.stripeService.constructEvent(req.body, sig)
            const paramsSaveEvent = {
                type: event.type,
                idStripe: event.id,
            }
            this.stripeService.saveEvent(paramsSaveEvent)
            const newDate = moment().locale('fr').format('DD MMM YYYY [à] HH[h]mm')
            // Handle the event
            switch (event.type) {
                case 'payment_intent.succeeded':
                    const paymentIntent = event.data.object
                    /* console.log('Payment succeeded:', paymentIntent) */
                    /* this.commandeService.updateStatus('paid', paymentIntent.id) */
                    this.paymentService.updateStatus('paid', paymentIntent.id)
                    //send Mail payment succeed 
                    if (!paymentIntent.invoice) {
                        /*  this.mailserService.sendMailPayment(paymentIntent.id, newDate, true) */
                    }
                    break

                case 'payment_intent.payment_failed':
                    const failedPaymentIntent = event.data.object
                    /* console.log('Payment failed:', failedPaymentIntent.id) */
                    this.paymentService.updateStatus('unpaid', paymentIntent.id)
                    /* this.commandeService.updateStatus('unpaid', failedPaymentIntent.id) */
                    //send mail payment failed
                    if (!failedPaymentIntent.invoice) {
                        /*  this.mailserService.sendMailPayment(failedPaymentIntent.id, newDate, false) */
                    }
                    break
                case 'invoice.payment_succeeded':
                    const invoiceSucceeded = event.data.object
                    /* this.mailserService.sendMailSubscription(invoiceSucceeded.payment_intent, invoiceSucceeded.subscription, true, newDate) */
                    /* console.log('Invoice payment succeeded:', invoiceSucceeded.id) */
                    break

                case 'invoice.payment_failed':
                    const invoiceFailed = event.data.object
                    /* this.mailserService.sendMailSubscription(invoiceFailed.payment_intent, invoiceFailed.subscription, false, newDate)
                    console.log('Invoice payment failed:', invoiceFailed.id) */
                    break
                case 'customer.subscription.updated':
                    /* const subscription = event.data.object
                    console.log('Subscription updated:', subscription.id, 'New status:', subscription.status) */
                    /* this.subscriptionService.updateStatus(subscription.status, subscription.id) */
                    break
                case 'customer.subscription.created':
                    const subscriptionCreated = event.data.object
                    /* console.log('Subscription created:', subscriptionCreated) */
                    /* this.mailserService.sendMailCreateSubscription(subscriptionCreated.id, subscriptionCreated.status) */
                    break
                case 'customer.subscription.deleted':
                    const subscriptionCanceled = event.data.object
                    /* console.log('Subscription deleted:', subscriptionCanceled) */
                    /* this.mailserService.sendMailDeletedSubscription(subscriptionCanceled.id)
                    this.subscriptionService.updateStatus(subscriptionCanceled.status, subscriptionCanceled.id) */
                    break
            }

            res.sendStatus(200)
        } catch (err) {
            console.error('Webhook Error:', err.message)
            res.status(400).send(`Webhook Error: ${err.message}`)
        }
    }

    @Get(':id')
    getEvent(@Param('id') idStripe: string) {
        return this.stripeService.getEventDetail(idStripe)
    }
    @Get()
    getEvents() {
        return this.stripeService.getEvents()
    }
}
