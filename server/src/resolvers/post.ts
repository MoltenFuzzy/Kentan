import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Post, CreatePostInput } from "../entities/post";
import { CommentModel, PostModel } from "../entities/models";
import mongoose from "mongoose";
import { UserModel } from "../entities/models";

@Resolver()
export class PostResolver {
	// --------------------- QUERIES --------------------- //

	@Query(() => Post, { nullable: true })
	async postByPostId(
		@Arg("postId") postId: string,
		@Arg("populateComments") populate: boolean
	): Promise<Post | null> {
		if (!mongoose.Types.ObjectId.isValid(postId)) return null; // TODO: FIGURE OUT ERROR HANDLING INVALID IDs
		if (populate) return await PostModel.findById(postId).populate("comments");
		return await PostModel.findOne({ _id: postId });
	}

	@Query(() => Post, { nullable: true })
	async postByUserId(@Arg("userId") userId: string): Promise<Post | null> {
		return await PostModel.findOne({ "author._id": userId });
	}

	@Query(() => [Post])
	async posts(@Arg("limit", { defaultValue: 10 }) limit: number): Promise<Post[] | null> {
		return await PostModel.find().sort({ $natural: -1 }).limit(limit);
		// return await PostModel.find().populate("author._id");
	}

	// --------------------- MUTATIONS --------------------- //

	@Mutation(() => Post)
	async createPost(@Arg("PostInput") PostInput: CreatePostInput): Promise<Post | null> {
		const post = await PostModel.create(PostInput);
		const update = { $inc: { postsCount: 1 }, $push: { posts: post._id } };
		await UserModel.findById(PostInput.author._id, update);
		return post;
	}

	@Mutation(() => Boolean)
	async deletePost(@Arg("id", () => String) id: string): Promise<boolean> {
		const post = await PostModel.findByIdAndDelete(id);
		// if post is not found, return false and throw an error
		// if (!post) return { errors: [fieldError("post", "Post not found")] };
		// update user's postsCount and post reference array
		const update = { $inc: { postsCount: -1 }, $pull: { posts: post?._id } };
		await UserModel.findById(post?.author._id, update);
		// delete all comments associated with post
		post?.comments.forEach(async (commentId) => {
			await CommentModel.findByIdAndDelete(commentId);
		});
		return post ? true : false;
	}

	@Mutation(() => Boolean)
	async updatePost(
		@Arg("id", () => String) id: string,
		@Arg("PostInput") PostInput: CreatePostInput
	): Promise<boolean> {
		const post = await PostModel.updateOne({ _id: id }, PostInput);
		return post ? true : false;
	}

	@Mutation(() => Post)
	async likePost(
		@Arg("id", () => String) id: string,
		@Arg("userId", () => String) userId: string
	): Promise<Post | null> {
		const query = { _id: id, likedByUsers: { $ne: userId } };
		const update = { $inc: { likesCount: 1 }, $push: { likedByUsers: userId } };
		const options = { new: true };

		return await PostModel.findOneAndUpdate(query, update, options);
	}

	@Mutation(() => Post)
	async unlikePost(
		@Arg("id", () => String) id: string,
		@Arg("userId", () => String) userId: string
	): Promise<Post | null> {
		const query = { _id: id, likedByUsers: userId };
		const update = { $inc: { likesCount: -1 }, $pull: { likedByUsers: userId } };
		const options = { new: true };

		return await PostModel.findOneAndUpdate(query, update, options);
	}
}
