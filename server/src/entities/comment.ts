import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Author, CreateAuthorInput } from "./author";
import { Post } from "./post";
import { Date } from "mongoose";
import { CreatePostIdInput, PostId } from "./postId";
import { PostUnion } from "../types/unions";

@ObjectType()
export class Comment {
	@Field((type) => ID)
	readonly _id: ObjectId;

	@Field((type) => Author)
	@Property()
	author: Author;

	@Field((type) => PostUnion, { nullable: true })
	@Property({ ref: () => Post, required: true })
	postId: typeof PostUnion;

	// @Field((type) => Post, { nullable: true })
	// @Property({ ref: Post, required: true })
	// postId: Ref<Post>;

	@Field()
	@Property()
	body: string;

	@Field()
	@Property({ default: 0 })
	commentsCount: number;

	@Field((type) => [ID], { nullable: true })
	@Property({ type: ObjectId, required: true })
	likedByUsers: ObjectId[]; // array of user ids

	@Field()
	@Property({ default: 0 })
	likesCount: number;

	@Field((type) => Date)
	readonly createdAt: Date;

	@Field((type) => Date)
	readonly updatedAt: Date;
}

@InputType()
export class CreateCommentInput {
	@Field(() => CreateAuthorInput)
	author: CreateAuthorInput;

	@Field(() => CreatePostIdInput)
	postId: CreatePostIdInput;

	@Field(() => String)
	body: string;
}
