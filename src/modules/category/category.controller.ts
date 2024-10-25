import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import {CategoryService} from "./category.service";
import {Category} from "./category.entity";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async getAllCategories(@Query() param: {
        query?: string
        sortBy?: string
        sizes?: number[]
        pizzaTypes?: number[]
        priceFrom?: number
        priceTo?: number
        ingredients?: number[]
    }): Promise<Category[]> {
        return this.categoryService.getAll(param)
    }
}
