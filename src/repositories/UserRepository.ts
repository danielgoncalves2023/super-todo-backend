import { EntityManager, ILike } from "typeorm";
import User from "../entities/User";
import Friendship from "../entities/Friendship";

export class UserRepository {
    private manager: EntityManager

    constructor(
        manager: EntityManager
    ){
        this.manager = manager
    }

    createUser = async (
        name: string, email: string, password: string, country: string, state: string, city: string, date_of_birth: string
    ) => {
        const user = new User(name, email, password, country, state, city, date_of_birth)

        return this.manager.save(user)
    }

    getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                email: email,
                password: password
            }
        })
    }

    getUserById = async (id_user: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                id_user: id_user
            }
        })
    }

    searchUser = async (userQuery: string): Promise<User[] | null> => {
        const users = await this.manager.find(User, {
            where: [
                { name: ILike(`%${userQuery}%`) },
                { country: ILike(`%${userQuery}%`) },
                { city: ILike(`%${userQuery}%`) },
                { email: ILike(`%${userQuery}%`) }
            ]
        })

        return users.length > 0 ? users : null;
    }

    inviteFriend = async (id_user1: string, id_user2: string) => {
        const invite = await this.manager.create(Friendship, {
            
        })
    }

    // deleteUser = async (userID: string) => {
    //     return this.manager.delete(User, userID)
    // }
}