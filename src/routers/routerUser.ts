import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userController = new UserController()

export const routerUser = Router()

// Middleware para definir cabeçalho CORS em todas as rotas
routerUser.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://super-todo-frontend-one.vercel.app');
    next();
});

// Registro de novo usuário
routerUser.post('/register', userController.createUser)

// Login de usuário
routerUser.post('/login', userController.getUserByEmailAndPassword)

// Alterar avatar de usuário
routerUser.patch('/user/avatar', userController.changeAvatar)

// Deletar usuário
routerUser.delete('/user', userController.deleteUser)

// Verificar se email está disponível para cadastro
routerUser.get('/user/:email', userController.verifyEmailRegister)