import { AppDataSource } from "../database/index";
import { Task } from "../entities/Task";
import { TaskRepository } from "../repositories/TaskRepository";

export class TaskService {
    private taskRepository: TaskRepository;

    constructor(
        taskRepository = new TaskRepository(AppDataSource.manager)
    ) {
        this.taskRepository = taskRepository;
    }

    createTask = async (name: string, id_todo: string): Promise<Task | null> => {
        console.log('Task Service...')
        return this.taskRepository.createTask(name, id_todo)
    }

    deleteTask = async (id_task: string) => {
        return this.taskRepository.deleteTask(id_task)
    }

    getTasks = async (id_todo: string): Promise<Task[]> => {
        return this.taskRepository.getTasks(id_todo);
    }

    editStatusTask = async (id_task: string) => {
        return this.taskRepository.editStatusTask(id_task);
    }
}
