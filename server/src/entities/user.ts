// https://stackoverflow.com/questions/63580523/combining-type-graphql-with-typegoose-using-multiple-decorators
// We can combine typegoose and type-graphql schemas and models

// import { ObjectId } from "@typegoose/typegoose";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType, InputType } from "type-graphql";
import { IsEmail, MaxLength, MinLength } from "class-validator";

@ObjectType()
export class User {
	@Field({ nullable: true })
	@prop()
	username?: string;

	@Field()
	@prop({ required: true })
	email: string;

	@prop()
	password: string;
}

export const UserModel = getModelForClass(User); // UserModel is a regular Mongoose Model with correct types

@InputType()
export class CreateUserInput {
	@Field(() => String)
	username: string;

	@IsEmail()
	@Field(() => String)
	email: string;
}