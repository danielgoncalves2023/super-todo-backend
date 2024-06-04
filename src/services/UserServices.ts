import { AppDataSource } from "../database/index";
import { Task } from "../entities/Task";
import { Todo } from "../entities/Todo";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository"

export class UserService {
    private userRepository: UserRepository;

    constructor(
        userRepository = new UserRepository(AppDataSource.manager)
    ) {
        this.userRepository = userRepository;
    }

    createUser = async (email: string, password: string, name: string, gender: string): Promise<User | null> => {
        return this.userRepository.createUser(email, password, name, gender)
    }

    getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
        return await this.userRepository.getUserByEmailAndPassword(email, password)
    }

    createTodo = async (
        name: string, id_user: string
    ): Promise<Todo | null> => {
        return this.userRepository.createTodo(name, id_user)
    }

    getTodos = async (id_user: string): Promise<Todo[]> => {
        return this.userRepository.getTodos(id_user);
    }

    createTask = async (
        name: string, id_todo: string
    ): Promise<Todo | null> => {
        return this.userRepository.createTodo(name, id_todo)
    }

    getTasks = async (id_todo: string): Promise<Task[]> => {
        return this.userRepository.getTasks(id_todo);
    }

    // deleteUser = async (userID: string): Promise<any> => {
    //     return await this.userRepository.deleteUser(userID)
    // }
}
