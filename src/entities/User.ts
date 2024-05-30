import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { randomUUID } from 'crypto'
import Post from "./Post";

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn()
    id_user: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    resume: string;

    @Column({ nullable: false })
    avatar: string;

    @Column({ nullable: false })
    country: string;

    @Column({ nullable: false })
    state: string;

    @Column({ nullable: false })
    city: string;

    @Column({ nullable: false })
    date_of_birth: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @OneToMany(() => Post, post => post.user)
    posts!: Post[];

    @ManyToMany(() => User, user => user.friends)
    @JoinTable()
    sentFriendRequests!: User[];

    @ManyToMany(() => User, user => user.sentFriendRequests)
    receivedFriendRequests!: User[];

    @ManyToMany(() => User, user => user.receivedFriendRequests)
    @JoinTable()
    friends!: User[];

    constructor(
        name: string, email: string, password: string, country: string, state:string, city: string, date_of_birth: string
    ){
            this.id_user = randomUUID();
            this.name = name;
            this.resume = 'Escreva o seu resumo aqui...';
            this.avatar = '/images/image_avatar_default.webp';
            this.country = country;
            this.state = state;
            this.city = city;
            this.date_of_birth = date_of_birth;
            this.email = email;
            this.password = password;
    }
}