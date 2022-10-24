import { ObjectId } from "mongodb";
import { ObjectType, Field, ID, InputType } from "type-graphql";

@ObjectType()
export class CommentId {
	@Field((type) => ID)
	readonly _id: ObjectId;
}

@InputType()
export class CreateCommentIdInput {
	@Field(() => ID)
	_id: ObjectId;
}
