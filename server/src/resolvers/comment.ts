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
		@Arg("populate", { nullable: true }) populate: boolean
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
		@Arg("populate", { nullable: true }) populate: boolean
	): Promise<Comment | null> {
		const comment = await CommentModel.create(CommentInput); // create a comment
		const post = await PostModel.findOneAndUpdate(
			{ _id: CommentInput.postId },
			{ $push: { comments: comment._id } }, //! CHECK IF CORRECT COMMENT ID IS ADDED
			{ new: true }
		); // add comment to post
		console.log(post);
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
		return await CommentModel.deleteOne({ _id: id });
	}
}
