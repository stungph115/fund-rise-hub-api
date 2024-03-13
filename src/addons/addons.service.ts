import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Addons } from './addons.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddonsService {
    constructor(
        @InjectRepository(Addons) private addonsRepository: Repository<Addons>
    ) { }

    async addAddons() {

    }

    async updateAddons() {

    }

    async deleteAddons() { }
}
