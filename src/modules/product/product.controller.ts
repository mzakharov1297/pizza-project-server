import {Controller, Get, Param, Query} from '@nestjs/common';
import {Product} from "./entities/product.entity";
import {ProductService} from "./product.service";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async searchProduct(@Query() query: {
        name?: string
    }): Promise<Product[]> {
        return this.productService.search(query)
    }

    @Get(":id")
    async getProductById(@Param('id') id: number): Promise<Product> {
        return this.productService.getProductById(id)
    }
}
