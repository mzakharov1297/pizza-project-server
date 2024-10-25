import {Inject, Injectable} from '@nestjs/common';
import {Ingredient} from "./ingredient.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class IngredientService {
    constructor(@InjectRepository(Ingredient) private readonly ingredientRepository: Repository<Ingredient>) {
    }

    async getAll(): Promise<Ingredient[]> {
        return await this.ingredientRepository.find()
    }
}
