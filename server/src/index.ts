import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageLocalDefault,
	ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers/resolvers";
import connectDB from "./config/db";

const main = async () => {
	const schema = await buildSchema({
		resolvers,
	});

	// The ApolloServer constructor requires two parameters: your schema
	// definition and your set of resolvers.
	const server = new ApolloServer({
		schema,
		introspection: true,
		csrfPrevention: true,
		cache: "bounded",
		plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
	});

	// cant set custom path :(
	// https://github.com/apollographql/apollo-server/issues/1617

	connectDB();

	// The `listen` method launches a web server.
	server.listen().then(({ url }: any) => {
		console.log(`Server ready at ${url}`);
	});
};

main();
