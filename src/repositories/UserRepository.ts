import { EntityManager } from "typeorm";
import { User } from "../entities/User";
import { Todo } from "../entities/Todo";
import { Task } from "../entities/Task";

export class UserRepository {
    private manager: EntityManager

    constructor(
        manager: EntityManager
    ) {
        this.manager = manager
    }

    createUser = async (email: string, password: string, name: string, gender: string) => {
        const user = new User(email, password, name, gender)

        return this.manager.save(user)
    }

    createTodo = async (name: string, id_user: string): Promise<Todo | null> => {
        const user: User | null = await this.manager.findOne(User, {
            where: {
                id_user: id_user
            }
        })

        if (!user) {
            console.log('Erro ao criar todo');
            return null; // Retorna null se o usuário não for encontrado
        }

        const todo = new Todo(name, user)

        return this.manager.save(todo)
    }

    getTodos = async (id_user: string): Promise<Todo[]> => {
        const user = await this.manager.findOne(User, {
            where: {
                id_user: id_user
            }
        })

        if (!user) {
            console.log('Erro ao carregar todos: usuário não encontrado');
            return []; // Retorna um array vazio se o usuário não for encontrado
        }

        const allTodos: Todo[] = await this.manager.find(Todo, {
            where: {
                user: { id_user: user.id_user }
            }
        })

        return allTodos;
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

        return this.manager.save(task)
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


    getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                email: email,
                password: password
            }
        })
    }

    // deleteUser = async (userID: string) => {
    //     return this.manager.delete(User, userID)
    // }
}