import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import User from "./User";
import Post from "./Post";
import { randomUUID } from "crypto";

@Entity("likes")
export default class Like {
    @PrimaryGeneratedColumn()
    id_like!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "id_user" })
    user: User;

    @ManyToOne(() => Post)
    @JoinColumn({ name: "id_post" })
    post: Post;

    constructor(user: User, post: Post) {
        this.id_like = randomUUID();
        this.user = user;
        this.post = post;
    }
}
