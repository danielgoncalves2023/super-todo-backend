import { Request, Response } from 'express'
import { UserRepository } from '../repositories/UserRepository'
import { AppDataSource } from '../database'

export class UserController {
    userService: UserRepository

    constructor(userService = new UserRepository(AppDataSource.manager)) {
        this.userService = userService
    }

    createUser = (request: Request, response: Response) => {
        const { email, password, name, gender } = request.body

        if (!email || !password || !name || !gender) {
            return response.status(400).json({ message: `Bad request! Todos os campos são obrigatórios` })
        } else {
            return response.status(201).json({ message: `Usuário criado` })
        }
    }

    createTodo = async (request: Request, response: Response) => {
        const { name, id_user } = request.body

        try {
            const responseData = await this.userService.createTodo(name, id_user)
            return response.status(201).json({ responseData })
        } catch (error) {
            console.error(error)
        }
    }

    getUserByEmailAndPassword = async (request: Request, response: Response) => {
        const { email, password } = request.body
        const user = await this.userService.getUserByEmailAndPassword(email, password)

        if (user) {
            return response.status(201).json({ user })
        } else {
            return response.status(404).json({ message: `Usuário não encontrado.` })
        }
    }

    getTodos = async (request: Request, response: Response) => {
        const { id_user } = request.params

        try {
            const todos = await this.userService.getTodos(id_user);
            return response.status(200).json(todos);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro ao carregar todos' });
        }
    }

    createTask = async (request: Request, response: Response) => {
        const { name, id_todo } = request.body

        try {
            const responseData = await this.userService.createTask(name, id_todo)
            return response.status(201).json({ responseData })
        } catch (error) {
            console.error(error)
        }
    }

    getTasks = async (request: Request, response: Response) => {
        const { id_todo } = request.params

        try {
            const tasks = await this.userService.getTasks(id_todo);
            return response.status(200).json(tasks);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro ao carregar tasks' });
        }
    }

    // deleteUser = async (request: Request, response: Response) => {
    //     const userReq = request.body
    //     const user = await this.userService.getUserById(userReq.id_user)

    //     if(userReq.id_user == user?.id_user && userReq.password == user?.password){
    //         this.userService.deleteUser(userReq.id_user)
    //         return response.status(201).json({ message: `Usuário deletado.` })

    //     } else {
    //     return response.status(400).json({ message: `Erro: Usuário ou senha incorretos.` })

    //     }
    // }
}