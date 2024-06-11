import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InvestService } from './invest.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';

@Controller('invest')
export class InvestController {
    constructor(private investService: InvestService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    createPayment(@Body() paymentData: any) {
        return this.investService.createInvest(paymentData)
    }
}
