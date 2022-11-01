import { getModelForClass } from "@typegoose/typegoose";
import { Post } from "./post";
import { Comment } from "./comment";
import { User } from "./user";

export const PostModel = getModelForClass(Post, {
	schemaOptions: { timestamps: true },
});

export const CommentModel = getModelForClass(Comment, {
	schemaOptions: { timestamps: true },
});

export const UserModel = getModelForClass(User, {
	schemaOptions: { timestamps: true },
}); // UserModel is a regular Mongoose Model with correct types
