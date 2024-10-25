import {
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany,
    ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Category} from "../../category/category.entity";
import {Ingredient} from "../../ingredient/ingredient.entity";
import {ProductItem} from "./product-item.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    imageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    @ManyToMany(() => Ingredient, (ingredient) => ingredient.products)
    @JoinTable({
        name: "products_ingredients",
    })
    ingredients: Ingredient[];

    @OneToMany(() => ProductItem, (productItem) => productItem.product)
    productItems: ProductItem[];
}