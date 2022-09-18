import { Grid, Container, Group, MediaQuery, Stack } from "@mantine/core";
import { NavBar, NavBarProps } from "../components/NavBar/NavBar";
import { Post } from "../components/Post/Post";

export default function HomePage() {
	const props: NavBarProps = {
		links: [
			{ link: "messages", label: "messages" },
			{ link: "notifications", label: "notifications" },
		],
	};
	return (
		<>
			<NavBar links={props.links} />
			<Grid justify="center" align="flex-start">
				<Grid.Col span={5}>
					<Stack spacing={10}>
						<Post body="hello world" />
						<Post body="hello world" />
						<Post body="hello world" />
					</Stack>
				</Grid.Col>
				<Grid.Col span={2}>
					<MediaQuery query="(max-width: 1200px)" styles={{ display: "none" }}>
						<Stack spacing={10}>
							<div className="bg-slate-700 h-96">Default container</div>
						</Stack>
					</MediaQuery>
				</Grid.Col>
			</Grid>
		</>
	);
}
