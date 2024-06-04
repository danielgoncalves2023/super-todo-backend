import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Todo } from "../entities/Todo"
import { Task } from "../entities/Task"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/db.sqlite",
    entities: [User, Todo, Task],
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