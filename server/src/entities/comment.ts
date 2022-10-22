import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "./user";
import { Author, CreateAuthorInput } from "./author";
import { Ref } from "../types/types";

@ObjectType()
export class Comment {
	@Field((type) => ID)
	readonly _id: ObjectId;

	@Field((type) => Author)
	@Property()
	author: Author;

	@Field((type) => ID)
	@Property()
	test: Ref<User>;

	@Field()
	@Property()
	body: string;
}

@InputType()
export class CreateCommentInput {
	@Field(() => CreateAuthorInput)
	author: CreateAuthorInput;

	@Field(() => String)
	body: string;
}
