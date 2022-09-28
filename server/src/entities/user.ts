// https://stackoverflow.com/questions/63580523/combining-type-graphql-with-typegoose-using-multiple-decorators
// We can combine typegoose and type-graphql schemas and models

// import { ObjectId } from "@typegoose/typegoose";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType, InputType, ID } from "type-graphql";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Schema } from "mongoose";

@ObjectType()
export class User {
	@Field((type) => ID)
	@prop()
	_id: Schema.Types.ObjectId;

	@Field()
	@prop()
	name: string;

	@Field({ nullable: true })
	@prop({ nullable: true })
	username?: string;

	@prop({ nullable: true })
	password: string;

	@Field()
	@prop({ unique: true })
	email!: string;

	@Field()
	@prop()
	avatar?: string;

	@prop()
	refreshToken!: string;
}

export const UserModel = getModelForClass(User, {
	schemaOptions: { timestamps: true },
}); // UserModel is a regular Mongoose Model with correct types

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

	@Field(() => String, { nullable: true })
	avatar?: string;

	@Field(() => String, { nullable: true })
	username?: string;

	@Field(() => String, { nullable: true })
	password?: string;

	@Field(() => String, { nullable: true })
	refreshToken?: string;
}
