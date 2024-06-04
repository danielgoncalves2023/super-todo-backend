import { Router } from "express";
import { UserController } from "./controllers/UserController";

const userController = new UserController()

export const router = Router()

// ----- ROTAS CRIAÇÃO, EXCLUSÃO E LOGIN DE USUÁRIO ------
// Registro de novo usuário
router.post('/register', userController.createUser)

// Login de usuário
router.post('/login', userController.getUserByEmailAndPassword)

// ----- ROTAS TODO ------
// CREATE new Todo
router.post('/user/todo', userController.createTodo)

// CARREGAR Todos de usuário
router.get('/:id_user/todos', userController.getTodos)

// EDIT Todo Name

// DELETE Todo


// ----- ROTAS TASK ------
// CREATE new Task
router.post('/user/todo/task', userController.createTask)

// CARREGAR Tasks de usuário
router.get('/user/:id_todo/tasks', userController.getTasks)

// EDIT Task
router.put('/user/id_todo/id_task')

// DELETE Task