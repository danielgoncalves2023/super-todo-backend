import { Request, Response } from 'express'
import { AppDataSource } from "../database"
import { PostRepository } from "../repositories/PostRepository"

export class PostController {
    postService: PostRepository

    constructor(postService = new PostRepository(AppDataSource.manager)) {
        this.postService = postService
    }

    createPost = async (request: Request, response: Response) => {
        const { id_user, content_text, content_url_image, content_url_video } = request.body

        if (!id_user) {
            return response.status(400).json({ message: `Bad request!` })
        } else {
            this.postService.createPost(id_user, content_text, content_url_image, content_url_video)
            return response.status(201).json({ message: `Post criado` })
        }
    }
    
    editPost = async (request: Request, response: Response) => {
        const { id_post } = request.params
        const { content_text, content_url_image, content_url_video } = request.body;

        if (!id_post) {
            return response.status(400).json({ message: `Bad request!` })
        } 
        
        try {
            const result = await this.postService.editPost(id_post, content_text, content_url_image, content_url_video);
            return response.status(200).json({ message: "Post editado com sucesso", result });
        } catch (error) {
            return response.status(500).json({ message: `Erro ao editar o post: ${error}` });
        }
    }

    deletePost = async (request: Request, response: Response) => {
        const { id_post } = request.params

        if (!id_post) {
            return response.status(400).json({ message: `Bad request!` })
        } else {
            this.postService.deletePost(id_post)
            // console.log(user)
            return response.status(201).json({ message: `Post deletado` })
        }
    }

    getAllPosts = async (request: Request, response: Response) => {
        const { id_user } = request.params
    
        if (!id_user) {
            return response.status(400).json({ message: `Bad request!` })
        } else {
            try {
                const posts = await this.postService.getAllPosts(id_user);
                return response.status(200).json(posts);
            } catch (error) {
                return response.status(500).json({ message: `Internal server error` });
            }
        }
    }

    like = async (request: Request, response: Response) => {
        const { id_user, id_post } = request.body
    
        if (!id_user || !id_post) {
            return response.status(400).json({ message: `Bad request!` })
        } else {
            try {
                const result = await this.postService.like(id_user, id_post);
                return response.status(200).json({ message: result });
            } catch (error) {
                return response.status(500).json({ message: `Internal server error`, error: error });
            }
        }
    }

    countLikes = async (request: Request, response: Response) => {
        const { id_post } = request.params;

        if (!id_post) {
            return response.status(400).json({ message: `Bad request!` });
        } else {
            try {
                const likeCount = await this.postService.countLikes(id_post);
                return response.status(200).json({ likeCount: likeCount });
            } catch (error) {
                console.error(`Error counting likes for post ${id_post} => ${error}`);
                return response.status(500).json({ message: `Internal server error` });
            }
        }
    }

    // getPostById = async (request: Request, response: Response) => {
    //     const { id_post } = request.params

    //     if (!id_post) {
    //         return response.status(400).json({ message: `Bad request!` })
    //     }

    //     try {
    //         const post = await this.postService.getPostById(id_post);
    //         return response.status(200).json(post);
    //     } catch (error) {
    //         return response.status(500).json({ message: error });
    //     }
    // }
}