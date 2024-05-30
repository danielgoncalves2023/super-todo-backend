import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";
import { randomUUID } from 'crypto'

@Entity('friendship')
export default class Friendship {
    @PrimaryGeneratedColumn()
    id_friendship: string;

    @ManyToOne(() => User, user => user.sentFriendRequests)
    sender!: User;

    @ManyToOne(() => User, user => user.receivedFriendRequests)
    receiver!: User;

    @ManyToOne(() => User, user => user.friends)
    friend!: User;

    constructor(){
        this.id_friendship = randomUUID();
    }
}
