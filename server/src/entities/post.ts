import { prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class Post {
	@Field()
	@prop()
	author!: ObjectId;

	@Field()
	@prop()
	body!: string;

	@Field()
	@prop()
	likes!: number;
}

export const PostModel = getModelForClass(Post, {
	schemaOptions: { timestamps: true },
});

@InputType()
export class CreatePostInput {
	@Field(() => String)
	author: string;

	@Field(() => String)
	body: string;

	@Field(() => Number)
	likes: number;
}
