import { Injectable } from '@nestjs/common'
import { Category } from './category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SubCategory } from 'src/sub-category/sub-category.entity'
import { categoriesData } from 'src/dummy-data/category-data'

@Injectable()
export class CategoryService {
    newDate = new Date
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(SubCategory) private subCategoryRepository: Repository<SubCategory>,
    ) {
        this.saveCategoriesToDatabase()
    }
    //add default data
    async saveCategoriesToDatabase() {
        const categoriesExists = await this.categoryRepository.find()
        if (categoriesExists.length === 0) {
            try {
                categoriesData.forEach(async categoryData => {
                    const category = this.categoryRepository.create({
                        id: categoryData.id,
                        name: categoryData.name,
                        createdAt: this.newDate,
                        updatedAt: this.newDate
                    })
                    await this.categoryRepository.save(category)
                    categoryData.subCategories.forEach(async subCatData => {
                        const subCategory = this.subCategoryRepository.create({
                            id: subCatData.id,
                            name: subCatData.name,
                            category: category,
                            createdAt: this.newDate,
                            updatedAt: this.newDate
                        })
                        await this.subCategoryRepository.save(subCategory)

                    })
                })
            } catch {
                console.log("error data insertion categories")
            }
        } else {
            return
        }
    }

    async getCategories() {
        return await this.categoryRepository.find({ relations: { subCatgory: true } })
    }
}
