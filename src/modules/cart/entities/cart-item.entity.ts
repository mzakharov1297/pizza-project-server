import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import {ProductItem} from "../../product/entities/product-item.entity";
import {Cart} from "./cart.entity";
import {Ingredient} from "../../ingredient/ingredient.entity";

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({default: 1})
    quantity: number


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    @ManyToOne(() => ProductItem, (productItem) => productItem.cartItems)
    productItem: ProductItem;

    @ManyToOne(() => Cart, (cart) => cart.cartItems)
    cart: Cart;

    @ManyToMany(() => Ingredient, (ingredient) => ingredient.cartItems)
    @JoinTable({
        name: "cart_items_Ingredients",
    })
    ingredients: Ingredient[];
}