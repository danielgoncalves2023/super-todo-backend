import express from "express"
import cors from 'cors';
import { routerTask } from "./routers/routerTask";
import { routerTodo } from "./routers/routerTodo";
import { routerUser } from "./routers/routerUser";

const server = express();
const port = process.env.PORT || 3333;

server.use(cors({
    origin: 'https://super-todo-frontend-one.vercel.app',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
server.use(express.json());
server.use(routerUser);

server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})