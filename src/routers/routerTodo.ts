import { Router } from "express";
import { TodoController } from "../controllers/TodoController";

const todoController = new TodoController()

export const routerTodo = Router()

// CREATE new Todo
routerTodo.post('/user/todo', todoController.createTodo)

// DELETE Todo
routerTodo.delete('/user/:id_todo', todoController.deleteTodo)

// CARREGAR Todos de usuário
routerTodo.get('/:id_user/todos', todoController.getTodos)