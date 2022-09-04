import { ObjectType } from "type-graphql";
import { Field } from "type-graphql/dist/decorators";

@ObjectType() 
export class User {
	@Field(() => String) 
	id!: string;
	
	@Field()
	email: string;

	@Field()
	picture: string;
  
	@Field({ nullable: true })
	description?: string;
  
	@Field()
	creationDate: Date;
  
	@Field(() => [String])
	ingredients: string[];
}