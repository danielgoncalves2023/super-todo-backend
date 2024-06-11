import { Request, Response } from 'express'
import { AppDataSource } from '../database'
import { TaskRepository } from '../repositories/TaskRepository'
import { TaskService } from '../services/TaskService'

export class TaskController {
    taskService: TaskService

    constructor(taskService = new TaskService(new TaskRepository(AppDataSource.manager))) {
        this.taskService = taskService
    }

    createTask = async (request: Request, response: Response) => {
        const { name, id_todo } = request.body

        try {
            const responseData = await this.taskService.createTask(name, id_todo)
            return response.status(201).json({ responseData })
        } catch (error) {
            console.error(error)
        }
    }

    getTasks = async (request: Request, response: Response) => {
        const { id_todo } = request.params

        try {
            const tasks = await this.taskService.getTasks(id_todo);
            return response.status(200).json(tasks);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro ao carregar tasks' });
        }
    }

    deleteTask = async (request: Request, response: Response) => {
        const { id_task } = request.params

        if (!id_task) {
            return response.status(400).json({ message: `Bad request!` })
        }

        try {
            await this.taskService.deleteTask(id_task)
            return response.status(200).json({ message: 'Task deletada.' })
        } catch (error) {
            console.error(error)
        }
    }

    editStatusTask = async (request: Request, response: Response) => {
        const { id_task } = request.body

        if (!id_task) {
            return response.status(400).json({ message: `Bad request! Preencha corretamente o campo.` })
        }

        try {
            const responseDate = await this.taskService.editStatusTask(id_task)
            return response.status(201).json({ message: `Task iniciada com sucesso =: ${responseDate}` })
        } catch (error) {
            console.error(error)
        }
    }
}