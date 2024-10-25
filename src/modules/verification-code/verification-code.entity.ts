import {Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";

@Entity()
export class VerificationCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string

    @Column("timestamp with time zone")
    expireAt: Date

    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(() => User, (user) => user.verificationCode)
    user: User

}