import argon2id from "argon2";
import { sign } from "jsonwebtoken";
import {
	Arg,
	Ctx,
	Field,
	Mutation,
	ObjectType,
	Query,
	Resolver,
} from "type-graphql";
import { User, UserModel, CreateUserInput } from "../entities/user";
import { Context } from "../context";

@ObjectType()
class LoginResponse {
	@Field()
	accessToken: string;
}

@Resolver()
export class UserResolver {
	// returns json of all users
	@Query(() => [User])
	async getUsers(): Promise<User[] | null> {
		return await UserModel.find();
	}

	@Query(() => User, { nullable: true })
	async getUserById(@Arg("id") id: string): Promise<User | null> {
		return await UserModel.findById(id);
	}

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

		// res.cookie()
		return {
			accessToken: sign({ userId: user.id }, process.env.JWT_SECRET as string),
		};
	}

	@Mutation(() => User)
	async createUser(
		@Arg("UserInput") UserInput: CreateUserInput
	): Promise<User | null> {
		UserInput.password = await argon2id.hash(UserInput.password);
		return await UserModel.create(UserInput);
	}

	@Mutation(() => Boolean)
	async deleteUser(@Arg("id", () => String) id: string): Promise<boolean> {
		await UserModel.deleteOne({ _id: id });
		return true;
	}
}
