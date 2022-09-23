import {
	Grid,
	Container,
	Group,
	MediaQuery,
	Stack,
	Button,
} from "@mantine/core";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { NavBar, NavBarProps } from "../components/NavBar/NavBar";
import { Post } from "../components/Post/Post";
import { useRouter } from "next/router";

const props: NavBarProps = {
	links: [
		{ link: "messages", label: "messages" },
		{ link: "notifications", label: "notifications" },
	],
};

export default function HomePage() {
	const router = useRouter();
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status === "unauthenticated") {
			void router.push("/login");
		}
	}, [status]);

	return (
		<>
			<NavBar links={props.links} />
			<Grid justify="center">
				<Grid.Col span={5}>
					<Stack spacing={10}>
						<Post body="hello world" />
						<Post body="hello world" />
						<Post body="hello world" />
					</Stack>
				</Grid.Col>
				<Grid.Col span={2}>
					<MediaQuery query="(max-width: 1000px)" styles={{ display: "none" }}>
						<Stack spacing={10}>
							<div className="bg-slate-700 h-96">Default container</div>
						</Stack>
					</MediaQuery>
				</Grid.Col>
			</Grid>
		</>
	);
}
