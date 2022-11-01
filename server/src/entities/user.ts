// https://stackoverflow.com/questions/63580523/combining-type-graphql-with-typegoose-using-multiple-decorators
// We can combine typegoose and type-graphql schemas and models

import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType, InputType, ID } from "type-graphql";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { ObjectId } from "mongodb";
import { Post } from "./post";

@ObjectType()
export class User {
	@Field((type) => ID)
	readonly _id: ObjectId;

	@Field()
	@Property()
	name: string;

	@Field({ nullable: true })
	@Property({ nullable: true })
	username?: string;

	@Property({ nullable: true })
	password: string;

	@Field()
	@Property({ unique: true })
	email!: string;

	@Field()
	@Property({ nullable: true })
	avatar?: string;

	@Field({ nullable: true, description: "user's background image" })
	@Property({ nullable: true, default: "" })
	banner: string;

	@Field((type) => [ID], { nullable: true })
	@Property({ type: ObjectId, required: true })
	posts: ObjectId[];

	@Field()
	@Property({ default: 0 })
	postsCount: number;

	@Field((type) => [ID], { nullable: true })
	@Property({ type: ObjectId, required: true })
	followers: ObjectId[];

	@Field()
	@Property({ default: 0 })
	followersCount: number;

	@Field((type) => [ID], { nullable: true })
	@Property({ type: ObjectId, required: true })
	following: ObjectId[];

	@Field()
	@Property({ default: 0 })
	followingCount: number;

	// @Property()
	// refreshToken!: string;

	@Field((type) => Date)
	readonly createdAt: Date;

	@Field((type) => Date)
	readonly updatedAt: Date;
}

@InputType()
export class CreateUserInput {
	@Field(() => String)
	username: string;

	@Field(() => String)
	password: string;

	@IsEmail()
	@Field(() => String)
	email: string;
}

// NOTE: in type-graphql by default, all fields are non nullable, just like properties in TypeScript.
@InputType()
export class AuthUserInput {
	@Field(() => String)
	name: string;

	@Field(() => String)
	email: string;

	// in case avatar link is not provided, it will be null
	@Field(() => String, { nullable: true })
	avatar?: string;

	// in case they sign in with google, no username is provided intially
	@Field(() => String, { nullable: true })
	username?: string;

	// in case they sign in with google, no password is needed
	@Field(() => String, { nullable: true })
	password?: string;

	// idk what this is for yet
	@Field(() => String, { nullable: true })
	refreshToken?: string;
}
