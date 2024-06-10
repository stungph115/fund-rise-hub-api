import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { TypeOrmModule } from '@nestjs/typeorm';
/* 
import { CommandeService } from 'src/commande/commande.service';
import { Customer } from 'src/customer/customer.entity';
import { Commande } from 'src/commande/commande.entity';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { Subscription } from 'src/subscription/subscription.entity'; */
import { MailerService } from 'src/mailer/mailer.service';
import { Event } from './webhook.entity';
import { PaymentService } from 'src/payment/payment.service';
import { Payment } from 'src/payment/payment.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event/* , Customer, Commande, Subscription */, Payment, User]),
  ],
  controllers: [WebhookController],
  providers: [WebhookService,/*  CommandeService, SubscriptionService, */ MailerService, PaymentService]
})
export class WebhookModule { }
