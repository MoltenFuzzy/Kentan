import { prop, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType, InputType, ID } from "type-graphql";
import { Schema } from "mongoose";

@ObjectType()
export class Post {
	@Field((type) => ID)
	@prop()
	authorId: Schema.Types.ObjectId;

	@Field({ nullable: true })
	@prop({ nullable: true })
	avatarImage?: string;

	@Field()
	@prop()
	body: string;

	@Field((type) => [String])
	@prop({ type: String, required: true, default: [] })
	categories: string[];

	@Field()
	@prop()
	likes: number;
}

export const PostModel = getModelForClass(Post, {
	schemaOptions: { timestamps: true },
});

@InputType()
export class CreatePostInput {
	@Field(() => String)
	authorId!: Schema.Types.ObjectId;

	@Field(() => String, { nullable: true })
	avatarImage?: string;

	@Field(() => String)
	body: string;

	@Field(() => Number)
	likes: number;
}
