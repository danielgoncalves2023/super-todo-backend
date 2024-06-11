import { Request, Response } from 'express'
import { AppDataSource } from '../database'
import { TodoRepository } from '../repositories/TodoRepository'
import { TodoService } from '../services/TodoService'

export class TodoController {
    todoService: TodoService

    constructor(todoService = new TodoService(new TodoRepository(AppDataSource.manager))) {
        this.todoService = todoService
    }

    createTodo = async (request: Request, response: Response) => {
        const { name, id_user } = request.body

        if (!name || !id_user) {
            return response.status(400).json({ message: `Bad request! Todos os campos são obrigatórios` })
        }

        try {
            const responseData = await this.todoService.createTodo(name, id_user)
            return response.status(201).json({ responseData })
        } catch (error) {
            console.error(error)
        }
    }

    getTodos = async (request: Request, response: Response) => {
        const { id_user } = request.params

        try {
            const todos = await this.todoService.getTodos(id_user);
            return response.status(200).json(todos);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro ao carregar todos' });
        }
    }

    deleteTodo = async (request: Request, response: Response) => {
        const { id_todo } = request.params

        if (!id_todo) {
            return response.status(400).json({ message: `Bad request! Todos os campos são obrigatórios` })
        }

        try {
            await this.todoService.deleteTodo(id_todo)
            return response.status(201).json({ message: `TODO deletado com sucesso` })
        } catch (error) {
            console.error(error)
        }
    }
}