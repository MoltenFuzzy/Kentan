import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export function withAuth(gssp: GetServerSideProps) {
	return async (context: GetServerSidePropsContext) => {
		// auth user
		const session = getSession(context);

		if (!session) {
			return {
				redirect: {
					destination: "/login",
				},
			};
		}

		const gsspData = await gssp(context); // Run `getServerSideProps` to get page-specific data

		// Pass page-specific props along with user data from `withAuth` to component
		return {
			props: {
				...gsspData,
				session,
			},
		};
	};
}
