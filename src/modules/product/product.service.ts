import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./entities/product.entity";
import {Like, Repository} from "typeorm";
import {CreateProductDto} from "./dto/CreateProduct.dto";
import {Category} from "../category/category.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
    ) {
    }

    async getProductById(id: number): Promise<Product> {
        try {
            const product = await this.productRepository.findOne({
                where: {
                    id: id
                },
                relations: {
                    ingredients: true,
                    productItems: true,
                    category: true,
                },
            })
            if (!product) {
                throw new Error();
            }

            return product
        } catch (e) {
            throw new HttpException(`Product with id ${id} not found`, HttpStatus.NOT_FOUND);
        }


    }

    async search(productName: { name?: string }) {
        if (!productName.name) {
            return await this.productRepository.find({
                relations: {
                    ingredients: true,
                    productItems: true,
                    category: true
                },

            })
        }

        return await this.productRepository.find({
            where: {
                name: Like(`%${productName.name}%`),
            },
            relations: {
                ingredients: true,
                productItems: true
            }
        })
    }
}
