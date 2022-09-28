import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Post, PostModel, CreatePostInput } from "../entities/post";

@Resolver()
export class PostResolver {
	@Query(() => Post, { nullable: true })
	async postByAuthorId(@Arg("id") userId: string): Promise<Post | null> {
		return await PostModel.findOne({ author: userId });
	}

	@Query(() => [Post])
	async posts(): Promise<Post[] | null> {
		return await PostModel.find();
	}

	@Mutation(() => Post)
	async createPost(
		@Arg("PostInput") PostInput: CreatePostInput
	): Promise<Post | null> {
		return await PostModel.create(PostInput);
	}
}
