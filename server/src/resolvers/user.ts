import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User, UserModel } from "../entities/user";

@Resolver()
export class UserResolver {
	@Query(() => [User])
	async getAllUsers() : Promise<User[] | null> {
		return await UserModel.find();
	}

	// i think i need to create a type/interface for the user 
	// so I can pass in all the properties
	@Mutation(() => User)
	async createUser(@Arg("username") username: string): Promise<User | null> {
		const user = UserModel.create({
			username: username,
		});
		return user;
	}
}
