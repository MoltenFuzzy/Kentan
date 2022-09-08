import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User, UserModel, CreateUserInput} from "../entities/user";

@Resolver()
export class UserResolver {
	// returns json of all users
	@Query(() => [User])
	async getAllUsers() : Promise<User[] | null> {
		return await UserModel.find();
	}

	// i think i need to create a type/interface for the user 
	// so I can pass in all the properties
	//* Done
	@Mutation(() => User)
	async createUser(@Arg("UserInput") UserInput: CreateUserInput): Promise<User | null> {
		return UserModel.create(UserInput);
	}
}
