import { AppDataSource } from "../database/index";
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

    verifyEmailRegister = async (email: string) => {
        return this.userRepository.verifyEmailRegister(email)
    }

    getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
        return await this.userRepository.getUserByEmailAndPassword(email, password)
    }

    changeAvatar = async (avatar_src: string, id_user: string) => {
        return this.userRepository.changeAvatar(avatar_src, id_user)
    }

    deleteUser = async (id_user: string) => {
        return await this.userRepository.deleteUser(id_user)
    }
}
