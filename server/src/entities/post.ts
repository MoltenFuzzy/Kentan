import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType, InputType, ID, createUnionType } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ref } from "../types/types";
import { User } from "./user";
import { Author, CreateAuthorInput } from "./author";
import { Comment } from "./comment";

@ObjectType()
export class Post {
	@Field((type) => ID)
	readonly _id: ObjectId;

	@Field((type) => Author)
	@Property()
	author: Author;

	@Field()
	@Property()
	body: string;

	@Field((type) => [String])
	@Property({ type: String, required: true, default: [] })
	categories: string[];

	// TODO: add comment object
	@Field((type) => [Comment])
	@Property({ type: Comment, required: true, default: [] })
	comments: Comment[];

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
}

export const PostModel = getModelForClass(Post, {
	schemaOptions: { timestamps: true },
});

@InputType()
export class CreatePostInput {
	@Field(() => CreateAuthorInput)
	author: CreateAuthorInput;

	@Field(() => String)
	body: string;
}
