import express from "express"
import cors from 'cors';
import { router } from "./router";

const server = express();
const port = 3333;

server.use(cors());
server.use(express.json());
server.use(router)

server.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})