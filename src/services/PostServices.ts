import { AppDataSource } from "../database";
import Post from "../entities/Post";
import { PostRepository } from "../repositories/PostRepository";

export class PostService {
    private postRepository: PostRepository;

    constructor(
        postRepository = new PostRepository(AppDataSource.manager)
    ){
        this.postRepository = postRepository;
    }

    createPost = async (
        id_user: string, content_text?: string, content_url_image?: string, content_url_video?: string
    ): Promise<Post> => {
        const user = await this.postRepository.getUserById(id_user)
        if(!user){
            throw new Error("User not found");
        }
        return this.postRepository.createPost(user, content_text, content_url_image, content_url_video)
    }

    deletePost = async ( id_post: string ) => {

        return this.postRepository.deletePost(id_post)
    }

    // getPostById = async ( id_post: string ) => {

    //     return this.postRepository.getPostById(id_post)
    // }

    editPost = async ( id_post: string ) => {

        return this.postRepository.editPost(id_post)
    }

    getAllPosts = async ( id_user: string ): Promise<Post[]> => {

        return this.postRepository.getAllPosts(id_user)
    }

    like = async ( id_user: string, id_post: string ) => {

        return this.postRepository.like(id_user, id_post)
    }

    countLikes = async (id_post: string) => {
        return this.postRepository.countLikes(id_post);
    }
}