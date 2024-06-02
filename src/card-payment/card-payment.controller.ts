import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CardPaymentService } from './card-payment.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';

@Controller('card-payment')
export class CardPaymentController {
    constructor(private cardPaymentService: CardPaymentService) { }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getCards(@Param('id', ParseIntPipe) id: number) {
        return this.cardPaymentService.getCards(id)
    }

    @Post('attach')
    @UseGuards(JwtAuthGuard)
    attachCardToCustomer(@Body() params: any) {
        return this.cardPaymentService.attachCardToCustomerStripe(params)
    }

    @Post('default')
    @UseGuards(JwtAuthGuard)
    setCardDefault(@Body() params: any) {
        return this.cardPaymentService.setCardDefault(params)
    }

    @Delete(':paymentMethod')
    deletePaymentMethod(
        @Param('paymentMethod') paymentMethod: string,
    ) {
        return this.cardPaymentService.deleteCard(paymentMethod)
    }
}
