import { createUnionType } from "type-graphql";
import { Post } from "../entities/post";
import { PostId } from "../entities/postId";
import { Comment } from "../entities/comment";
import { CommentId } from "../entities/commentId";

export const PostUnion = createUnionType({
	name: "PostUnion", // the name of the GraphQL union
	types: () => [PostId, Post] as const, // function that returns tuple of object types classes
	// our implementation of detecting returned object type
	resolveType: (value) => {
		//TODO: FIND A WAY TO AUTOMATICALLY UPDATE FIELDS FROM POST OBJECT TYPE
		const temp =
			"author" in value ||
			"body" in value ||
			"categories" in value ||
			"comments" in value ||
			"commentsCount" in value ||
			"createdAt" in value ||
			"likedByUsers" in value ||
			"likesCount" in value ||
			"updatedAt" in value;

		if (temp) {
			return Post; // we can return object type class (the one with `@ObjectType()`)
		}
		if ("_id" in value) {
			return PostId; // or the ID
		}
		return undefined;
	},
});

export const CommentUnion = createUnionType({
	name: "CommentUnion", // the name of the GraphQL union
	types: () => [CommentId, Comment] as const, // function that returns tuple of object types classes
	// our implementation of detecting returned object type
	resolveType: (value) => {
		//TODO: FIND A WAY TO AUTOMATICALLY UPDATE FIELDS FROM POST OBJECT TYPE
		const temp =
			"author" in value ||
			"body" in value ||
			"categories" in value ||
			"comments" in value ||
			"commentsCount" in value ||
			"createdAt" in value ||
			"likedByUsers" in value ||
			"likesCount" in value ||
			"updatedAt" in value;

		if (temp) {
			return Comment; // we can return object type class (the one with `@ObjectType()`)
		}
		if ("_id" in value) {
			return CommentId; // or the ID
		}
		return undefined;
	},
});
