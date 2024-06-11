import { EntityManager } from "typeorm";
import { User } from "../entities/User";

export class UserRepository {
    private manager: EntityManager

    constructor(
        manager: EntityManager
    ) {
        this.manager = manager
    }

    verifyEmailRegister = async (email: string) => {
        // Verificar se o email já está em uso
        const existingUser = await this.manager.findOne(User, { where: { email } });

        if (existingUser) {
            return 'Email indisponível'
        }

        return 'Email disponível';
    }

    createUser = async (email: string, password: string, name: string, gender: string) => {
        // Verificar se o email já está em uso
        const existingUser = await this.manager.findOne(User, { where: { email } });

        if (existingUser) {
            throw new Error("Email already in use");
        }

        // Criar novo usuário
        const user = new User(email, password, name, gender);
        return this.manager.save(user);
    }

    getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                email: email,
                password: password
            }
        })
    }

    changeAvatar = async (avatar_src: string, id_user: string) => {
        return this.manager.update(User, id_user, {
            avatar: avatar_src
        })
    }

    deleteUser = async (id_user: string) => {
        return this.manager.delete(User, id_user)
    }
}