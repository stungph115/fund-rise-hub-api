import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddonsEarned } from './addons-earned.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddonsEarnedService {
    constructor(
        @InjectRepository(AddonsEarned) private addonsEarnedRepository: Repository<AddonsEarned>,
    ) { }
}
