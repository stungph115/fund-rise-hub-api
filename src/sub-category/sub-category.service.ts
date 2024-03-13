import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './sub-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubCategoryService {
    constructor(
        @InjectRepository(SubCategory) private subCategoryRepository: Repository<SubCategory>
    ) { }
}
