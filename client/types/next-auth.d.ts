import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			// the reason why this is optional is because the user is not logged in and the id is not available
			id?: string;
			email?: string;
			username?: string;
			name?: string;
			image?: string;
			accessToken?: string;
			refreshToken?: string;
			accessTokenExpires?: number;
		};
	}

	interface User {
		accessToken: string;
		refreshToken: string;
		accessTokenExpires: string;
	}
}

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		userId?: string;
		/** OpenID ID Token */
		idToken?: string;
		accessToken?: string;
		refreshToken?: string;
		accessTokenExpires?: number;
	}
}
