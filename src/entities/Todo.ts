import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from './User';
import { Task } from './Task';

@Entity('todos')
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    id_todo!: string;

    @Column()
    name: string;

    @ManyToOne(() => User, user => user.todos)
    @JoinColumn({ name: 'id_user' })
    user: User;

    @OneToMany(() => Task, task => task.todo)
    tasks?: Task[];

    @CreateDateColumn()
    created_at!: Date;

    constructor(
        name: string, user: User
    ){
            this.name = name;
            this.user = user;
    }
}