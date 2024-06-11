import { EntityManager } from "typeorm";
import { User } from "../entities/User";
import { Todo } from "../entities/Todo";

export class TodoRepository {
    private manager: EntityManager

    constructor(
        manager: EntityManager
    ) {
        this.manager = manager
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
            return []; // Retorna um array vazio se o usuário não for encontrado
        }

        const allTodos: Todo[] = await this.manager.find(Todo, {
            where: {
                user: { id_user: user.id_user }
            }
        })

        return allTodos;
    }

    deleteTodo = async (id_todo: string) => {
        return this.manager.delete(Todo, { id_todo: id_todo })
    }
}