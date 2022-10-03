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

	//! COME BACK TO THIS: Should we allow the querying of the author's data?
	//! only reason i would need the author's id is to find the author's data
	//! BUT IF WE POPULATE THE AUTHOR'S DATA EVERY TIME WE QUERY ALL POSTS, IT MIGHT BE SLOW
	// @Field((type) => User)
	// @Property({ ref: User, required: true })
	// _id: Ref<User>;

	@Field((type) => ID)
	readonly _id: ObjectId;

	@Field()
	@Property()
	name: string;

	@Field({ nullable: true })
	@Property({ nullable: true })
	avatarImage?: string;
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

	// add comments object
	// @Field()
	// @Property()
	// comments: number;

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
	avatarImage?: string;
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
