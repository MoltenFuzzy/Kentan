import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import gqlClient from "@gqlSDK/clients/gqlClient";
import { Account, User } from "next-auth";
import { getSdk } from "@gqlSDK/graphql/sdk"; // THIS FILE IS THE GENERATED FILE

export default NextAuth({
	secret: process.env.JWT_SECRET!,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			checks: "state",
		}),
	],
	pages: { signIn: "/login", signOut: "/" },
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 7, // 7 days
	},
	callbacks: {
		// async redirect({ url, baseUrl }) {
		// 	return baseUrl;
		// },

		async signIn({ user, account, profile, email, credentials }) {
			// if signin provider gives us access token, and etc tokens, then we dont need to generate one in the backend
			// if not then we have to do it for all providers
			if (account?.provider === "google") {
				user.id = (await AuthUser(user, account)).providerAuthUser;
				return true;
			}
			return false;
		},

		//* Do i send this token to my backend?? then my backend sends it back to the frontend?
		async jwt({ token, user, account, profile }) {
			if (user) {
				token = {
					...token,
					userId: user.id,
					idToken: account?.id_token,
					accessToken: account?.access_token,
					refreshToken: account?.refresh_token,
					accessTokenExpires: account?.expires_at,
				};
			}

			return token;
		},

		async session({ session, token, user }) {
			// for some reason user in session is undefined always
			// https://stackoverflow.com/questions/72073321/why-did-user-object-is-undefined-in-nextauth-session-callback
			session.user.id = token?.userId;
			session.user.accessToken = token?.accessToken;
			// session.user.refreshToken = token?.refreshToken;
			// session.user.accessTokenExpires = token.accessTokenExpires;
			return session;
		},
	},
	// Enable debug messages in the console if you are having problems
	// debug: process.env.NODE_ENV === "development",
});

function AuthUser(user: User, account: Account) {
	const { ProviderAuthUser } = getSdk(gqlClient);
	const variables = {
		userInput: {
			name: user.name!,
			email: user.email!,
			password: null,
			avatar: user.image,
			refreshToken: account.refresh_token,
		},
	};
	return ProviderAuthUser(variables);
}
