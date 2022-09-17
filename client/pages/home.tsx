import { NavBar, NavBarProps } from "../components/NavBar/NavBar";
import Post from "../components/Post/Post";

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
			<Post />
			<Post />
			<Post />
		</>
	);
}
