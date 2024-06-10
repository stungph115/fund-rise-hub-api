import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from 'src/auth/auth.jwtGuard';

@Controller('favorite')
export class FavoriteController {
    constructor(private favoriteService: FavoriteService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    addFavorite(@Body() params: any) {
        return this.favoriteService.addFavorite(params)
    }


    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    deleteFavorite(@Param('id', ParseIntPipe) favoriteId: number) {
        return this.favoriteService.deleteFavorite(favoriteId)
    }
}
