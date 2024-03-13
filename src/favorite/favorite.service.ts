import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(Favorite) private favoriteRepository: Repository<Favorite>,

    ) { }
}
