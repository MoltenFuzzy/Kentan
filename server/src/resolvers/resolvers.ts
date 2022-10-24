import { UserResolver } from "./user";
import { PostResolver } from "./post";
import { CommentResolver } from "./comment";

export const resolvers = [UserResolver, PostResolver, CommentResolver] as const;
