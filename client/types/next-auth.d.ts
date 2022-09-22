import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			username: string | undefined;
			name: string | undefined;
			email: string | undefined;
			accessToken: string | undefined;
			refreshToken: string | undefined;
			accessTokenExpires: number | undefined;
		};
	}

	interface User {
		accessToken: string;
		refreshToken: string;
		accessTokenExpires: string;
	}

	interface Profile {}
}

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		idToken?: string;
		accessToken?: string;
		refreshToken?: string;
		accessTokenExpires?: number;
	}
}
