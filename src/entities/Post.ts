import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { randomUUID } from 'crypto'
import User from "./User";

@Entity('posts')
export default class Post {
    @PrimaryGeneratedColumn()
    id_post: string;

    @Column({ type: 'text' })
    content_text?: string;

    @Column({ type: 'text' })
    content_url_image?: string;

    @Column({ type: 'text' })
    content_url_video?: string;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'id_user' })
    user: User;

    constructor(
        user: User, content_text?: string, content_url_image?: string, content_url_video?: string
    ){
            this.id_post = randomUUID();
            this.created_at = new Date();
            this.updated_at = new Date();
            this.content_text = content_text || '';
            this.content_url_image = content_url_image || '';
            this.content_url_video = content_url_video || '';
            this.user = user;
    }
}