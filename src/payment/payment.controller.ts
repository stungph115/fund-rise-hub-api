import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';

@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    createPayment(@Body() paymentData: any) {
        console.log(paymentData)
        return this.paymentService.createPayment(paymentData.paymentItentData)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getPayments() {
        return this.paymentService.getPayments()
    }

    @Get(':userId')
    @UseGuards(JwtAuthGuard)
    async getPaymentsUser(@Param('userId') userId: number) {
        return this.paymentService.getPaymentsWithInvestments(userId);
    }
}
