import { AppDataSource } from "../database/index";
import { Todo } from "../entities/Todo";
import { TodoRepository } from "../repositories/TodoRepository";

export class TodoService {
    private todoRepository: TodoRepository;

    constructor(
        todoRepository = new TodoRepository(AppDataSource.manager)
    ) {
        this.todoRepository = todoRepository;
    }

    createTodo = async (name: string, id_user: string): Promise<Todo | null> => {
        return this.todoRepository.createTodo(name, id_user)
    }

    getTodos = async (id_user: string): Promise<Todo[]> => {
        return this.todoRepository.getTodos(id_user);
    }

    deleteTodo = async (id_todo: string) => {
        return this.todoRepository.deleteTodo(id_todo)
    }
}
