import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType, InputType, ID } from "type-graphql";
import { ObjectId } from "mongodb";
import { Ref } from "../types/types";
import { User } from "./user";

//! https://www.becomebetterprogrammer.com/typescript-partial-type/

@ObjectType()
export class Author {
	// @Field((type) => User)
	// @Property({ ref: User, required: true })
	// author: Ref<User>;

	// Should we allow the querying of the author's data?
	// only reason i would need the author's id is to find the author's data
	@Field((type) => User)
	@Property({ ref: User, required: true })
	_id: Ref<User>;

	@Field()
	@Property()
	name: string;

	@Field()
	@Property()
	avatarImage: string;
}

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

	@Field()
	@Property()
	likes: number;
}

export const PostModel = getModelForClass(Post, {
	schemaOptions: { timestamps: true },
});

@InputType()
export class CreateAuthorInput implements Partial<User> {
	@Field(() => ID)
	_id?: ObjectId;

	@Field(() => String)
	name: string;

	@Field(() => String, { nullable: true })
	avatarImage?: string | undefined;
}

@InputType()
export class CreatePostInput {
	@Field(() => CreateAuthorInput)
	author: CreateAuthorInput;

	@Field(() => String)
	body: string;

	@Field(() => Number)
	likes: number;
}
