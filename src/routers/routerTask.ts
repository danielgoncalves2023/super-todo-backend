import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const taskController = new TaskController()

export const routerTask = Router()

// CREATE new Task
routerTask.post('/user/todo/task', taskController.createTask)

// DELETE Task
routerTask.delete('/user/todo/:id_task', taskController.deleteTask)

// CARREGAR Tasks de usuário
routerTask.get('/user/:id_todo/tasks', taskController.getTasks)

// EDIT Iniciar Task
routerTask.patch('/user/todo/task', taskController.editStatusTask)