import {Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Product} from "../product/entities/product.entity";
import {CartItem} from "../cart/entities/cart-item.entity";

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    imageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(()=> Product, (product) => product.ingredients)
    products: Product[];

    @ManyToMany(() => CartItem, (cartItem) => cartItem.ingredients)
    cartItems: CartItem[];
}