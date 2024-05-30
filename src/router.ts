import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { PostController } from "./controllers/PostController";

const userController = new UserController()
const postController = new PostController()

export const router = Router()

// ----- ROTAS CRIAÇÃO, EXCLUSÃO E LOGIN DE USUÁRIO ------
// Registro de novo usuário
router.post('/register', userController.createUser)

// Login de usuário
router.post('/login', userController.getUserByEmailAndPassword)

// ----- ROTAS USER ------
// Resultado de query de usuários
router.get('/user/:searchUser', userController.searchUser)

// Deletar usuário {DESABILITADO}
// router.delete('/user', userController.deleteUser)

// ----- ROTAS POST ------
// Criar novo post
router.post('/post', postController.createPost)

// Dar like em post
router.post('/post/like', postController.like)

// Retorna quantidade de likes em um post
router.get("/post/:id_post/likes", postController.countLikes);

// Retorna uma lista de array com os posts do usuário identificado pelo id_user
router.get('/post/:id_user', postController.getAllPosts)

// Retornar Post pelo id_post {DESABILITADO}
// router.get('/post/:id_post', postController.getPostById)

// Deletar o post do usuário identificado pelo id_post
router.delete('/post/:id_post', postController.deletePost)

// Editar o post do usuário
router.put('/post/:id_post', postController.editPost)
