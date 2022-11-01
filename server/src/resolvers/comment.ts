import { Comment, CreateCommentInput } from "../entities/comment";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CommentModel, PostModel } from "../entities/models";
import { CommentId, CreateCommentIdInput } from "../entities/commentId";

//! fix for error: You need to return instance of object type class, not a plain object!
// https://www.kimsereylam.com/typescript/graphql/2022/01/28/unions-in-typegraphql.html

// @Resolver()
// class SearchResolver {
// 	@Query((returns) => [PostUnion])
// 	async search(@Arg("phrase") phrase: string): Promise<Array<typeof PostUnion>> {
// 		const movies = await Movies.findAll(phrase);
// 		const actors = await Actors.findAll(phrase);

// 		return [...movies, ...actors];
// 	}
// }
@Resolver()
export class CommentResolver {
	@Query(() => Comment)
	async commentById(
		@Arg("id") id: string,
		@Arg("populate", { nullable: true, defaultValue: false }) populate: boolean
		// @Info() info: GraphQLResolveInfo
	): Promise<Comment | null> {
		//! https://stackoverflow.com/questions/65720312/type-graphql-how-to-know-which-fields-are-returned-by-resolver
		// check out graphql-parse-resolve-info to get the fields requested by the client
		if (populate) {
			return await CommentModel.findOne({ _id: id }).populate("postId");
		} else {
			return await CommentModel.findOne({ _id: id });
		}
	}

	@Query(() => [Comment])
	//! return a union type of Comment List or null because ID could be invalid
	async commentsByPostId(@Arg("postId") postId: string): Promise<Comment[] | null> {
		return await CommentModel.find({ postId: postId });
	}

	@Query(() => [Comment])
	async commentsByUserId(@Arg("userId") userId: string): Promise<Comment[] | null> {
		return await CommentModel.find({ "author._id": userId });
	}

	@Mutation(() => Comment)
	async createComment(
		@Arg("CommentInput") CommentInput: CreateCommentInput,
		@Arg("populate", { nullable: true, defaultValue: false }) populate: boolean
	): Promise<Comment | null> {
		// find post and see if post exists
		const post = await PostModel.findOne({ _id: CommentInput.postId._id });
		if (!post) return null;
		console.log(post);
		const comment = await CommentModel.create(CommentInput); // create a comment on db document
		console.log(comment);

		// add comment to post's comments ref array
		await post.updateOne(
			{ $inc: { commentsCount: 1 }, $push: { comments: comment._id } } //! CHECK IF CORRECT COMMENT ID IS ADDED
		); // add comment to post
		if (populate) {
			await comment.populate("postId");
		}
		return comment;
	}

	@Mutation(() => Comment)
	async updateComment(@Arg("id", () => String) id: string) {
		return await CommentModel.updateOne({ _id: id });
	}

	@Mutation(() => Boolean)
	async deleteComment(@Arg("id", () => String) id: string) {
		// TODO: Delete add comment references from comment when we add replies to comments
		const comment = await CommentModel.findOneAndDelete({ _id: id });
		// if comment is found, delete it and delete the comment from the post's comments ref array
		if (comment) {
			await PostModel.findOneAndUpdate(
				{ _id: comment?.postId },
				{ $inc: { commentsCount: -1 }, $pull: { comments: comment?._id } },
				{ new: true }
			);
			return true;
		}
		return false;
	}
}
