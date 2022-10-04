import argon2id from "argon2";
import { sign } from "jsonwebtoken";
import { Arg, Ctx, Field, ID, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { User, UserModel, CreateUserInput, AuthUserInput } from "../entities/user";
import { Context } from "../types/context";
import { ObjectId } from "mongodb";

@ObjectType()
class LoginResponse {
	@Field()
	accessToken: string;
}

@Resolver()
export class UserResolver {
	// returns json of all users
	@Query(() => [User])
	async users(): Promise<User[] | null> {
		return await UserModel.find();
	}

	@Query(() => User, { nullable: true, description: "get user by object id" })
	async user(@Arg("id") id: string): Promise<User | null> {
		return await UserModel.findById(id);
	}

	// TODO: #1 Add our own credential auth later
	@Mutation(() => LoginResponse)
	async loginUser(
		@Arg("username") username: string,
		@Arg("password") password: string,
		@Ctx() { req, res }: Context
	): Promise<LoginResponse> {
		const user = await UserModel.findOne({ username: username });
		if (!user) {
			throw new Error("User not found");
		}

		const valid = await argon2id.verify(user.password, password);
		if (!valid) {
			throw new Error("Invalid Password");
		}

		return {
			accessToken: sign({ userId: user.id }, process.env.JWT_SECRET!),
		};
	}

	@Mutation(() => ID)
	async providerAuthUser(
		@Arg("UserInput") UserInput: AuthUserInput,
		// maybe pass in email, however we need to put all user data into DB
		@Ctx() { req, res }: Context
	): Promise<ObjectId> {
		// if email does not exist, add to database?
		let user = await UserModel.findOne({ email: UserInput.email });
		if (!user) {
			console.log("Creating User");
			console.log(UserInput);
			user = await UserModel.create({
				name: UserInput.name,
				password: UserInput.password,
				email: UserInput.email,
				avatar: UserInput.avatar,
				refreshToken: UserInput.refreshToken,
			});
		}
		// not returning user id in jwt token because its an internal api
		// https://stackoverflow.com/questions/65030095/should-i-return-user-data-in-an-authentication-endpoint-using-jwt
		return user._id; // TODO: when we add more fields to user, we need to return the whole user object
	}

	@Mutation(() => User)
	async createUser(@Arg("UserInput") UserInput: CreateUserInput): Promise<User | null> {
		UserInput.password = await argon2id.hash(UserInput.password);
		return await UserModel.create(UserInput);
	}

	@Mutation(() => Boolean)
	async deleteUser(@Arg("id", () => String) id: string): Promise<boolean> {
		await UserModel.deleteOne({ _id: id });
		return true;
	}
}
