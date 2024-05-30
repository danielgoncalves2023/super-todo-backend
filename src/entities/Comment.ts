import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import User from "./User";
import Post from "./Post";
import { randomUUID } from "crypto";

@Entity("comments")
export default class Comment {
    @PrimaryGeneratedColumn()
    id_comment: string;

    @Column()
    content: string;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Post)
    @JoinColumn({ name: "post_id" })
    post: Post;

    constructor(content: string, user: User, post: Post) {
        this.id_comment = randomUUID();
        this.created_at = new Date();
        this.content = content;
        this.user = user;
        this.post = post;
    }
}
