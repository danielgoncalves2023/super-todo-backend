import express from "express"
import cors from 'cors';
import { routerTask } from "./routers/routerTask";
import { routerTodo } from "./routers/routerTodo";
import { routerUser } from "./routers/routerUser";

const server = express();
const port = 3333;

server.use(cors());
server.use(express.json());
server.use(routerUser, routerTodo, routerTask)

server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})