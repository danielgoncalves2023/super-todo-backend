import { Request, Response } from 'express'
import { AppDataSource } from '../database'
import { UserRepository } from '../repositories/UserRepository'
import { UserService } from '../services/UserServices'

export class UserController {
    userService: UserService

    constructor(userService = new UserService(new UserRepository(AppDataSource.manager))) {
        this.userService = userService
    }

    createUser = async (request: Request, response: Response) => {
        const { email, password, name, gender } = request.body

        if (!email || !password || !name || !gender) {
            return response.status(400).json({ message: `Bad request! Todos os campos são obrigatórios` })
        } else {
            const user = await this.userService.createUser(email, password, name, gender);
            return response.status(201).json({ message: user })
        }
    }

    verifyEmailRegister = async (request: Request, response: Response) => {
        const { email } = request.params

        const verifyEmail = await this.userService.verifyEmailRegister(email);

        if(verifyEmail === 'Email disponível'){
            return response.status(200).json({ message: 'Email disponível' })
        } else {
            return response.status(200).json({ message: 'Email indisponível' })
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

    changeAvatar = async (request: Request, response: Response) => {
        const { avatar_src, id_user } = request.body

        if (avatar_src) {
            const user = await this.userService.changeAvatar(avatar_src, id_user);
            return response.status(201).json({ message: user })
        } else {
            return response.status(400).json({ message: `Bad request!` })
        }
    }

    deleteUser = async (request: Request, response: Response) => {
        const { id_user } = request.body

        if (id_user) {
            this.userService.deleteUser(id_user)
            return response.status(201).json({ message: `Usuário deletado com sucesso.` })
        } else {
            return response.status(400).json({ message: `Erro: Usuário ou senha incorretos.` })
        }
    }
}