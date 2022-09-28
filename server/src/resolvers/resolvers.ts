import { UserResolver } from "./user";
import { PostResolver } from "./post";

export const resolvers = [UserResolver, PostResolver] as const;
