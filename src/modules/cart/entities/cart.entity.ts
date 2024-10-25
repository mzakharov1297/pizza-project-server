import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/user.entity";
import {CartItem} from "./cart-item.entity";

@Entity()
export class Cart{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 0})
    totalAmount: number;

    @Column()
    token: string;

    @OneToOne(() => User, (user) => user.cart, {nullable:true})
    @JoinColumn()
    user: User;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {onDelete: "CASCADE", cascade: true})
    cartItems: CartItem[];
}