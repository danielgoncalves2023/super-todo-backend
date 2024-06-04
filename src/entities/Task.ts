import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Todo } from './Todo';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id_task!: string;

    @Column()
    name: string;

    @Column()
    status: string;

    @CreateDateColumn()
    created_at!: Date;

    @Column({ nullable: true })
    start_date?: Date;

    @Column({ nullable: true })
    completion_date?: Date;

    @ManyToOne(() => Todo, todo => todo.tasks)
    @JoinColumn({ name: 'id_todo' })
    todo: Todo;

    constructor(
        name: string, todo: Todo
    ){
            this.status = 'Parado.'
            this.name = name;
            this.todo = todo;
    }
}