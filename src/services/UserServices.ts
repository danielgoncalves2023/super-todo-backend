import { AppDataSource } from "../database/index";
import User from "../entities/User";
import { UserRepository } from "../repositories/UserRepository"

export class UserService {
    private userRepository: UserRepository;

    constructor(
        userRepository = new UserRepository(AppDataSource.manager)
    ){
        this.userRepository = userRepository;
    }

    createUser = async (
        name: string, email: string, password: string, country: string, state: string, city: string, date_of_birth: string
    ): Promise<User> => {
        return this.userRepository.createUser(name, email, password, country, state, city, date_of_birth)
    }

    getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
        return await this.userRepository.getUserByEmailAndPassword(email, password)
    }

    getUserById = async (id_user: string): Promise<User | null> => {
        return await this.userRepository.getUserById(id_user)
    }

    searchUser = async (userQuery: string): Promise<User[] | null> => {
        return await this.userRepository.searchUser(userQuery)
    }

    inviteFriend = async (id_user1: string, id_user2: string) => {
        return await this.userRepository.inviteFriend(id_user1, id_user2)
    }

    // deleteUser = async (userID: string): Promise<any> => {
    //     return await this.userRepository.deleteUser(userID)
    // }

    // getAuthenticatedUser = async (email: string, password: string): Promise<User | null> => {
    //     return await this.userRepository.getUserByEmailAndPassword(email, password)
    // }

    // getToken = async (email: string, password: string): Promise<string> => {
    //     const user = await this.getAuthenticatedUser(email, password)

    //     if(!user){
    //         throw new Error('Email/password inválido!')
    //     }

    //     const tokenData = {
    //         name: user?.name,
    //         email: user?.email
    //     }

    //     const tokenKey = "123456789"

    //     const tokenOptions = {
    //         subject: user?.id_user
    //     }

    //     const token = sign(tokenData, tokenKey, tokenOptions)

    //     return token
    // }
}
