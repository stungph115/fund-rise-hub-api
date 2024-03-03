import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { UpdateService } from './update.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';

@Controller('update')
export class UpdateController {
    constructor(private updateService: UpdateService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @SetMetadata('setRole', 'role')
    @SetMetadata('userId', 'userId')
    addUpdate(@Body() userId) {
        return this.updateService.addUpdate()
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @SetMetadata('setRole', 'role')
    @SetMetadata('userId', 'userId')
    updateUpdate(@Body() userId) {
        return this.updateService.updateUpdate()
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @SetMetadata('setRole', 'setRole')
    deleteUpdate(@Param('id', ParseIntPipe) id: number) {

        return this.updateService.deleteUpdate()

    }
}
