import {
    Column,
    CreateDateColumn,
    Entity,
    Index, JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from "typeorm";
import {Cart} from "../cart/entities/cart.entity";
import {Order} from "../order/order.entity";
import {VerificationCode} from "../verification-code/verification-code.entity";
import {UserRoles} from "../../consts/user-roles";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserRoles,
        default: UserRoles.User
    })
    role: UserRoles;

    @Column({nullable:true})
    provider: string

    @Column({nullable:true})
    providerId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({default: false})
    verified: boolean

    @OneToOne(() => Cart, (cart) => cart.user, {nullable:true})
    @JoinColumn()
    cart: Cart;

    @OneToOne(() => Order, (order) => order.user, {nullable:true})
    order: Order

    @OneToOne(() => VerificationCode, (verificationCode) => verificationCode.user, {nullable: true})
    verificationCode: VerificationCode;

}