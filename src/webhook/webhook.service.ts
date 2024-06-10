import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import Stripe from 'stripe'
import { env } from 'env'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Event } from './webhook.entity'

@Injectable()
export class WebhookService {
    private stripe

    constructor(
        @InjectRepository(Event) private eventRepository: Repository<Event>,

    ) {
        this.stripe = new Stripe(env.STRIPE_API_SECRET_KEY, {
            apiVersion: '2023-10-16',
        })
    }

    async constructEvent(payload: any, sig: string): Promise<Stripe.Event> {
        try {
            return this.stripe.webhooks.constructEvent(payload, sig, env.WEBHOOK_SECRET_STRIPE)
        } catch (err) {
            throw new Error(`Failed to construct event: ${err.message}`)
            //throw exception instead
        }
    }
    async saveEvent(paramsSaveEvent: any) {
        const eventCreate = this.eventRepository.create({
            idStripe: paramsSaveEvent.idStripe,
            type: paramsSaveEvent.type,
            dateCreated: new Date()
        })
        const eventSave = await this.eventRepository.save(eventCreate)
        if (!eventSave) {
            throw new HttpException('ERROR_EVENT_CREATE', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return {
            statusCode: 201,
        }
    }
    async getEvents() {
        const events = await this.eventRepository.find({ order: { dateCreated: 'DESC' } })
        return events
    }
    async getEventDetail(idStripe) {
        try {
            const eventDetail = await this.stripe.events.retrieve(idStripe)
            return eventDetail
        } catch (error) {
            console.log("STRIPE_ERROR_", error)
            throw new HttpException("STRIPE_ERROR_" + error.raw.code, HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }
}
