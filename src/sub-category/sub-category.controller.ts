import { Controller } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';

@Controller('sub-category')
export class SubCategoryController {

    constructor(private subCategoryService: SubCategoryService) { }
}
