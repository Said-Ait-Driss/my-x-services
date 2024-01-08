import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, Unique } from 'typeorm';
import { hash } from 'bcrypt';
import { IsEmail, IsNotEmpty, Min } from 'class-validator';
import { UserInterface } from './user.interface';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User implements UserInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    username: string;

    @IsNotEmpty()
    @Column()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Column()
    @Min(8)
    password: string;

    @Column({ default: -1 })
    headquarter_id: number;

    @Column({ default: -1 })
    contact_info_id: number;

    @CreateDateColumn()
    createdAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }

    @Column({ default: 'client' })
    type: string;
}
