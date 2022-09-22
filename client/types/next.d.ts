import type { NextComponentType, NextPageContext } from "next";
import type { Session } from "next-auth";
import type { Router } from "next/router";

//https://stackoverflow.com/questions/73585821/nextjs-next-auth-sessionprovider-not-reading-session-property-typescript

declare module "next/app" {
	type AppProps<P = Record<string, unknown>> = {
		Component: NextComponentType<NextPageContext, any, P>;
		router: Router;
		__N_SSG?: boolean;
		__N_SSP?: boolean;
		session?: Session;
		pageProps: P;
	};
}
