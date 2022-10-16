// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export { default } from "next-auth/middleware";

export default withAuth(
	// `withAuth` augments your `Request` with the user's token.
	function middleware(req) {
		console.log(req.nextauth.token);
		return NextResponse.rewrite(new URL("/home", req.url));
	}
);

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/home", "/profile"],
};
