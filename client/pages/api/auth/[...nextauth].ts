import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
import gqlClient from "../../../src/clients/gqlClient";
import { gql } from "graphql-request";
import { Account, User } from "next-auth";

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	secret: process.env.JWT_SECRET,
	pages: { signIn: "/login" },
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 7, // 7 days
	},
	callbacks: {
		async redirect({ url, baseUrl }) {
			return baseUrl;
		},

		async signIn({ user, account, profile, email, credentials }) {
			// if signin provider gives us access token, and etc tokens, then we dont need to generate one in the backend
			// if not then we have to do it for all providers
			if (account.provider === "google") {
				AuthUser(user, account);
				return true;
			}
			return false;
		},

		//* Do i send this token to my backend?? then my backend sends it back to the frontend?
		async jwt({ token, user, account, profile }) {
			if (user) {
				token = {
					...token,
					idToken: account?.id_token,
					accessToken: account?.access_token,
					refreshToken: account?.refresh_token,
					accessTokenExpires: account?.expires_at,
				};
			}

			return token;
		},

		async session({ session, token }) {
			session.user.accessToken = token?.accessToken;
			// session.user.refreshToken = token?.refreshToken;
			// session.user.accessTokenExpires = token.accessTokenExpires;
			return session;
		},
	},
	// Enable debug messages in the console if you are having problems
	debug: process.env.NODE_ENV === "development",
});

function AuthUser(user: User, account: Account) {
	const mutation = gql`
		mutation Mutation($authUserUserInput: AuthUserInput!) {
			authUser(UserInput: $authUserUserInput)
		}
	`;

	const variables = {
		authUserUserInput: {
			name: user.name,
			password: null,
			email: user.email,
			avatar: user.image,
			refreshToken: account.refresh_token,
		},
	};
	//! BUG: this line of code causes callback errors >:(
	// user.accessToken = await gqlClient.request(mutation, variables);
	gqlClient.request(mutation, variables);
}
