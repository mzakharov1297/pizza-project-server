import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product.entity";
import {CartItem} from "../../cart/entities/cart-item.entity";

@Entity()
export class ProductItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column({nullable:true})
    size: number

    @Column({nullable:true})
    pizzaType: number;

    @ManyToOne(() => Product, (product) => product.productItems)
    product: Product;

    @OneToMany(() => CartItem, (cartItem) => cartItem.productItem)
    cartItems: CartItem[];
}