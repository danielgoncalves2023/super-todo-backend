import { Request, Response } from 'express'
import { UserRepository } from '../repositories/UserRepository'
import { AppDataSource } from '../database'

export class UserController {
    userService: UserRepository

    constructor(userService = new UserRepository(AppDataSource.manager)) {
        this.userService = userService
    }

    createUser = (request: Request, response: Response) => {
        const user = request.body

        if (!user.name || !user.country || !user.city || !user.state || !user.email || !user.password || !user.age_of_birth) {
            return response.status(400).json({ message: `Bad request! Todos os campos são obrigatórios` })
        } else {
            this.userService.createUser(user.name, user.email, user.password, user.country, user.state, user.city, user.age_of_birth)
            return response.status(201).json({ message: `Usuário criado` })
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

    searchUser = async (request: Request, response: Response) => {
        const userQuery = request.query.query

        if (!userQuery) {
            return response.status(400).json({ message: "Bad request! No search query provided." });
        } else {
            try {
                const queryResult = await this.userService.searchUser(userQuery as string);

                if (queryResult && queryResult.length > 0) {
                    return response.status(200).json(queryResult);
                } else if (queryResult && queryResult.length === 0) {
                    return response.status(404).json({ message: "No users found matching the criteria." });
                } else {
                    return response.status(500).json({ message: "Error retrieving data." });
                }
            } catch (error) {
                return response.status(500).json({ message: "Internal server error", error: error });
            }
        }
    }

    inviteFriend = async (request: Request, response: Response) => {
        const { id_user1, id_user2 } = request.body

        if (!id_user1 || !id_user2) {
            return response.status(400).json({ message: "Bad request!" });
        } else {
            try {
                await this.userService.inviteFriend(id_user1, id_user2);
                return response.status(200).json({message: "Convite enviado"});
            } catch (error) {
                return response.status(500).json({ message: "Internal server error", error: error });
            }
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