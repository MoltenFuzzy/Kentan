import { ApolloServer } from "apollo-server";

// import { buildSchema } from "type-graphql"

const {
	ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers");
const connectDB = require("./config/db");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
	typeDefs,
	resolvers,
	csrfPrevention: true,
	cache: "bounded",
	/**
	 * What's up with this embed: true option?
	 * These are our recommended settings for using AS;
	 * they aren't the defaults in AS3 for backwards-compatibility reasons but
	 * will be the defaults in AS4. For production environments, use
	 * ApolloServerPluginLandingPageProductionDefault instead.
	 **/
	plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

connectDB(); 

// The `listen` method launches a web server.
server.listen().then(({ url }: any) => {
	console.log(`Server ready at ${url}`);
});
