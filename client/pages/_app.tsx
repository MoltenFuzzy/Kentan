import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { AppProps } from "next/app";
import { getCookie, setCookie } from "cookies-next";
import Head from "next/head";
import {
	MantineProvider,
	ColorScheme,
	ColorSchemeProvider,
	MantineThemeColorsOverride,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "../styles/globals.css";

const queryClient = new QueryClient();

// colors : https://mantine.dev/theming/colors/

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
	const { Component, pageProps } = props;
	const [colorScheme, setColorScheme] = useState<ColorScheme>(
		props.colorScheme
	);

	const toggleColorScheme = (value?: ColorScheme) => {
		const nextColorScheme =
			value || (colorScheme === "dark" ? "light" : "dark");
		setColorScheme(nextColorScheme);
		setCookie("mantine-color-scheme", nextColorScheme, {
			maxAge: 60 * 60 * 24 * 30,
		});
	};

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Head>
					<title>Unnamed</title>
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width"
					/>
					<link rel="shortcut icon" href="/favicon.svg" />
				</Head>

				<ColorSchemeProvider
					colorScheme={colorScheme}
					toggleColorScheme={toggleColorScheme}
				>
					<MantineProvider
						theme={{
							colorScheme,
							colors: {
								// dark: [
								// 	"#eaf3fb",
								// 	"#cdd9e5",
								// 	"#aec0d0",
								// 	"#8ea7bd",
								// 	"#131C24",
								// 	"#131C24",
								// 	"#131C24",
								// 	"#131C24",
								// 	"#131C24",
								// 	"#181515",
								// ],
								milkTea: [
									"#ffefe0",
									"#f6d5ba",
									"#ecbb92",
									"#e3a068",
									"#da853e",
									"#c16b25",
									"#97531c",
									"#6d3c13",
									"#432308",
									"#1c0a00",
								],
							},
						}}
						withGlobalStyles
						withNormalizeCSS
					>
						<NotificationsProvider>
							<Component {...pageProps} />
						</NotificationsProvider>
					</MantineProvider>
				</ColorSchemeProvider>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</>
	);
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
	colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
