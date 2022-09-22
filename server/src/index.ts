import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers/resolvers";
import connectDB from "./config/db";

const main = async () => {
	const schema = await buildSchema({
		resolvers,
	});

	// The ApolloServer constructor requires two parameters: your schema
	// definition and your set of resolvers.
	// https://www.apollographql.com/docs/apollo-server/security/cors/
	const server = new ApolloServer({
		schema,
		introspection: true,
		csrfPrevention: true,
		cache: "bounded",
		context: ({ req, res }) => ({ req, res }),
		plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
	});

	// cant set custom path :(
	// https://github.com/apollographql/apollo-server/issues/1617

	await connectDB();

	// The `listen` method launches a web server.
	server.listen().then(({ url }) => {
		console.log(`Server ready at ${url}`);
	});
};

main();
