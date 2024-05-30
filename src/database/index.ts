import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "../entities/User"
import Post from "../entities/Post"
import Like from "../entities/Like"
import Comment from "../entities/Comment"
import Friendship from "../entities/Friendship"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/db.sqlite",
    entities: [User, Post, Like, Comment, Friendship],
    migrations: [
        "./src/database/migrations/*.ts"
    ],
})

AppDataSource.initialize()
.then(() => {
    console.log("Data Source inicializado!")
})
.catch((error) => {
    console.error(error)
})