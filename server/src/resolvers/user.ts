import { Mutation, Query, Resolver } from "type-graphql";
import { User } from "../schemas/user";

@Resolver()
export class UserResolver {
	@Query(() => String)
	hello() {
		return "hello world";
	}
}
