// https://stackoverflow.com/questions/63580523/combining-type-graphql-with-typegoose-using-multiple-decorators
// We can combine typegoose and type-graphql schemas and models

// import { ObjectId } from "@typegoose/typegoose";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType, InputType } from "type-graphql";
import { IsEmail, MaxLength, MinLength } from "class-validator";

@ObjectType()
export class User {
	@Field()
	@prop({ unique: true })
	username!: string;

	@prop()
	password!: string;

	@Field()
	@prop({ unique: true })
	email!: string;
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
