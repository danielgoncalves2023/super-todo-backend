import { EntityManager } from "typeorm"
import User from "../entities/User"
import Post from "../entities/Post"
import Like from "../entities/Like"

export class PostRepository {
    private manager: EntityManager

    constructor(
        manager: EntityManager
    ) {
        this.manager = manager
    }

    createPost = async (
        user: User, content_text?: string, content_url_image?: string, content_url_video?: string
    ) => {
        const post = new Post(user, content_text, content_url_image, content_url_video)

        return this.manager.save(post)
    }

    deletePost = async (id_post: string) => {
        try {
            // Encontre o post com o id_post fornecido
            const postToDelete = await this.manager.findOne(Post, { where: { id_post } });

            if (!postToDelete) {
                throw new Error("Post não encontrado");
            }

            // Exclua o post encontrado
            await this.manager.delete(Post, id_post);

            return "Post excluído com sucesso";
        } catch (error) {
            throw new Error(`Erro ao excluir o post: ${error}`);
        }
    }

    // getPostById = async (id_post: string) => {
    //     try {
    //         console.log(`Procurando post com id: ${id_post}`);

    //         // Encontre o post com o id_post fornecido
    //         const post = await this.manager.findOne(Post, { where: { id_post } });

    //         if (!post) {
    //             console.log("Post não encontrado");
    //             throw new Error("Post não encontrado");
    //         }

    //         console.log("Post encontrado:", post);
    //         return post;
    //     } catch (error) {
    //         console.error("Erro ao obter o post:", error);
    //         throw new Error(`Erro ao obter o post: ${error}`);
    //     }
    // }

    editPost = async (
        id_post: string, content_text?: string, content_url_image?: string, content_url_video?: string
    ) => {
        try {
            const postToEdit = await this.manager.findOne(Post, { where: { id_post } });

            // Validar se o post existe.
            if (!postToEdit) {
                throw new Error("Post não encontrado");
            }

            const updatedData = {
                content_text,
                content_url_image,
                content_url_video,
                updated_at: new Date()  // Atualizar o timestamp
            };

            await this.manager.update(Post, id_post, updatedData);
            return "Post atualizado com sucesso";
        } catch (error) {
            throw new Error(`Erro ao atualizar o post: ${error}`);
        }
    }

    getAllPosts = async (id_user: string) => {

        return this.manager.find(Post, {
            where: { user: { id_user: id_user } },
            relations: ["user"]  // Inclui os dados do usuário na resposta
        })
    }

    getUserById = async (id_user: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                id_user: id_user
            }
        })
    }

    like = async (id_user: string, id_post: string) => {
        try {
            const user = await this.manager.findOne(User, { where: { id_user: id_user } });
            const post = await this.manager.findOne(Post, { where: { id_post: id_post } });

            if (!user || !post) {
                throw new Error("Usuário ou post não encontrado");
            }

            const likeExist = await this.manager.find(Like, { where: { user: user, post: post } });

            // Validar se o post existe.
            if (likeExist.length > 0) {
                await this.manager.remove(Like, likeExist);
                return "Deslike sucesso";
            } else {
                const newLike = this.manager.create(Like, { user: user, post: post });
                await this.manager.save(Like, newLike);
                return "Like sucesso";
            }
        } catch (error) {
            console.error(`Falha ao processar like: ${error}`);
            throw new Error(`Erro ao dar like => ${error}`);
        }
    }

    countLikes = async (id_post: string) => {
        try {
            const post = await this.manager.findOne(Post, { where: { id_post: id_post } });

            if (!post) {
                throw new Error("Post not found");
            }

            const likeCount = await this.manager.count(Like, { where: { post: post } });
            return likeCount;
        } catch (error) {
            throw new Error(`Erro ao contar likes => ${error}`);
        }
    }
}