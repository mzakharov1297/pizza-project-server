import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Between, In, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {
  }

  async getAll(data: {
    query?: string
    sortBy?: string
    sizes?: number[]
    pizzaTypes?: number[]
    priceFrom?: number
    priceTo?: number
    ingredients?: number[]
  }): Promise<Category[]> {


    return await this.categoryRepository.find({
      where: {
        products: {
          ingredients: data.ingredients ? {
            id: In(data.ingredients)
          } : undefined,
          productItems: {
            size: data.sizes ? In(data.sizes) : undefined,
            pizzaType: data.pizzaTypes ? In(data.pizzaTypes) : undefined,
            price: Between(data.priceFrom, data.priceTo),
          },
        }
      },
      relations: {
        products: {
          productItems: true,
          ingredients: true,
        },
      },
      order: {
        id: 'asc',
        products: {
          productItems: {
            price: 'asc'
          }
        }
      },

    });
  }
}
