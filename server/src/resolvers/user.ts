import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User, UserModel, CreateUserInput } from "../entities/user";

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

	@Mutation(() => User)
	async createUser(
		@Arg("UserInput") UserInput: CreateUserInput
	): Promise<User | null> {
		return await UserModel.create(UserInput);
	}

	@Mutation(() => Boolean)
	async deleteUser(@Arg("id", () => String) id: string): Promise<boolean> {
		await UserModel.deleteOne({ _id: id });
		return true;
	}
}
