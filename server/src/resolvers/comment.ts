import { Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class CommentResolver {
	@Query(() => Comment)
	async commentById() {}

	@Query(() => [Comment])
	async commentsByPostId() {}

	@Query(() => [Comment])
	async commentsByUserId() {}

	@Mutation(() => Comment)
	async createComment() {}

	@Mutation(() => Comment)
	async updateComment() {}

	@Mutation(() => Boolean)
	async deleteComment() {}
}
