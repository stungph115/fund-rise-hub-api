import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FaQ } from './faq.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FaqService {
    constructor(
        @InjectRepository(FaQ) private faqRepository: Repository<FaQ>,

    ) { }
}
