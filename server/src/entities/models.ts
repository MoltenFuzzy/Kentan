import { getModelForClass } from "@typegoose/typegoose";
import { Post } from "./post";
import { Comment } from "./comment";

export const PostModel = getModelForClass(Post, {
	schemaOptions: { timestamps: true },
});
export const CommentModel = getModelForClass(Comment, {
	schemaOptions: { timestamps: true },
});
