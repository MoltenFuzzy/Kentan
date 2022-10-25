import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType, InputType, ID } from "type-graphql";
import { ObjectId } from "mongodb";
import { Author, CreateAuthorInput } from "./author";
import { Comment } from "./comment";
import { CommentUnion } from "../types/unions";

@ObjectType()
export class Post {
	@Field((type) => ID)
	readonly _id: ObjectId;

	@Field((type) => Author)
	@Property()
	author: Author;

	@Field((type) => ID)
	@Property()
	body: string;

	@Field((type) => [String])
	@Property({ type: String, required: true, default: [] })
	categories: string[];

	// @Field((type) => [ID])
	// @Property({ type: ObjectId, required: true, default: [] })
	// comments: ObjectId[];

	// CIRCULAR DEPENDENCY FIX
	// https://typegoose.github.io/typegoose/docs/guides/advanced/reference-other-classes/#circular-dependencies
	@Field((type) => [CommentUnion])
	@Property({ ref: () => Comment, required: true, default: [] })
	comments: typeof CommentUnion[];

	@Field()
	@Property({ default: 0 })
	commentsCount: number;

	// @Field((type) => [User], { nullable: true })
	// @Property({ ref: User, required: true, nullable: true })
	// likedByUsers: Ref<User>[]; // array of user ids

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
export class CreatePostInput {
	@Field(() => CreateAuthorInput)
	author: CreateAuthorInput;

	@Field(() => String)
	body: string;
}
