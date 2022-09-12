import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_GQL_ENDPOINT as string;

const gqlClient = new GraphQLClient(endpoint, {
	headers: {
		authorization: "Bearer MY_TOKEN",
	},
});

export default gqlClient;
