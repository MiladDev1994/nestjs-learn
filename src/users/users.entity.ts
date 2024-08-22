import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ nullable: true, type: "text"})
    twoFASecrete: string;

    @Column({ default: false, type: "boolean"})
    enable2FA: boolean;
}