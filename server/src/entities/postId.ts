import { ObjectId } from "mongodb";
import { ObjectType, Field, ID, InputType } from "type-graphql";

@ObjectType()
export class PostId {
	@Field((type) => ID)
	readonly _id: ObjectId;
}

@InputType()
export class CreatePostIdInput {
	@Field(() => ID)
	_id: ObjectId;
}
