import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Update } from './update.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateService {
    constructor(
        @InjectRepository(Update) private updateRepository: Repository<Update>
    ) { }


    async addUpdate() {

    }

    async updateUpdate() {

    }

    async deleteUpdate() {

    }

}
