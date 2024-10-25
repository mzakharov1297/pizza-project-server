import {Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "../user/user.entity";
import {OrderStatus} from "../../consts/status-enum";
import {CartItem} from "../cart/entities/cart-item.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.order, {nullable: true})
    user: User

    @Column()
    token: string

    @Column()
    totalAmount: number;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.Pending
    })
    status: OrderStatus

    @Column({nullable:true})
    paymentId: string

    @Column("simple-json")
    items: CartItem[]

    @Column()
    fullName: string

    @Column()
    address: string

    @Column()
    email: string

    @Column()
    phone: string

    @Column({nullable:true})
    comment: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}