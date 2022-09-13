import { NavBar, NavBarProps } from "../components/NavBar/NavBar";

export default function HomePage() {
	const props: NavBarProps = {
		links: [
			{ link: "dddd", label: "test" },
			{ link: "dsadsa", label: "test1" },
			{ link: "dddaasdd", label: "test2" },
		],
	};
	return (
		<>
			<NavBar links={props.links} />
		</>
	);
}
