import { ObjectId } from "mongodb";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { User } from "./user";

@ObjectType()
export class Author {
	// @Field((type) => User)
	// @Property({ ref: User, required: true })
	// author: Ref<User>;

	//! COME BACK TO THIS: Should we allow the querying of the author's data?
	//! only reason i would need the author's id is to find the author's data
	//! BUT IF WE POPULATE THE AUTHOR'S DATA EVERY TIME WE QUERY ALL POSTS, IT MIGHT BE SLOW
	// @Field((type) => User)
	// @Property({ ref: User, required: true })
	// _id: Ref<User>;

	@Field((type) => ID)
	readonly _id: ObjectId;

	@Field()
	@Property()
	name: string;

	@Field({ nullable: true })
	@Property({ nullable: true })
	avatarImage?: string;
}

//! Find out why I used Partial here
//! https://www.becomebetterprogrammer.com/typescript-partial-type/
@InputType()
// export class CreateAuthorInput implements Partial<User> {
export class CreateAuthorInput {
	@Field(() => ID)
	_id?: ObjectId;

	@Field(() => String)
	name: string;

	@Field(() => String, { nullable: true })
	avatarImage?: string;
}
