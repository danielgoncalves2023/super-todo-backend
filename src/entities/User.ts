import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "./Todo";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id_user!: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    gender: string;

    @Column({ nullable: false })
    avatar: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @CreateDateColumn()
    created_at!: Date;

    @OneToMany(() => Todo, todo => todo.user)
    todos?: Todo[];

    constructor(
        email: string, password: string, name: string, gender: string
    ){
            this.name = name;
            this.gender = gender;
            this.avatar = '/src/assets/avatar/avatar_default.png';
            this.email = email;
            this.password = password;
    }
}