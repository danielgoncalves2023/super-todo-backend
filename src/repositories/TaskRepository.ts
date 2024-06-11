import { EntityManager } from "typeorm";
import { Todo } from "../entities/Todo";
import { Task } from "../entities/Task";

export class TaskRepository {
    private manager: EntityManager

    constructor(
        manager: EntityManager
    ) {
        this.manager = manager
    }

    createTask = async (name: string, id_todo: string): Promise<Task | null> => {
        const todo: Todo | null = await this.manager.findOne(Todo, {
            where: {
                id_todo: id_todo
            }
        })

        if (!todo) {
            console.log('Erro ao criar task');
            return null; // Retorna null se o usuário não for encontrado
        }

        const task = new Task(name, todo)
        console.log('TaskRepository')
        return this.manager.save(task)
    }

    deleteTask = async (id_task: string) => {
        return this.manager.delete(Task, { id_task: id_task })
    }

    getTasks = async (id_todo: string): Promise<Task[]> => {
        const todo = await this.manager.findOne(Todo, {
            where: {
                id_todo: id_todo
            }
        })

        if (!todo) {
            console.log('Erro ao carregar tasks: todo não encontrado');
            return []; // Retorna um array vazio se o usuário não for encontrado
        }

        const allTasks: Task[] = await this.manager.find(Task, {
            where: {
                todo: { id_todo: todo.id_todo }
            }
        })

        return allTasks;
    }

    editStatusTask = async (id_task: string) => {
        const task = await this.manager.findOne(Task, {
            where: {
                id_task: id_task
            }
        })

        if (!task) {
            return 'Task não encontrada.'
        }

        if (task?.status === 'PARADA') {
            const updatedTask: any = await this.manager.update(Task, id_task, {
                status: 'INICIADA',
                start_date: new Date()
            })

            return updatedTask
        }

        if (task?.status === 'INICIADA') {
            const updatedTask: any = await this.manager.update(Task, id_task, {
                status: 'CONCLUIDA',
                completion_date: new Date()
            })

            return updatedTask
        }

        if (task?.status === 'CONCLUIDA') {

            return `Task já está concluída`
        }
    }
}