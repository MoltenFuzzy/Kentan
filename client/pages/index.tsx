import { NavBar, NavBarProps } from "../components/NavBar/NavBar";
import { TextInput } from "@mantine/core";
import Link from "next/link";

export default function HomePage() {
	const props: NavBarProps = {
		links: [
			{ link: "dddd", label: "test" },
			{ link: "dsadsa", label: "test1" },
			{ link: "dddaasdd", label: "test2" },
			{ link: "dddaaasaadssdd", label: "test3" },
		],
	};
	return (
		<>
			<NavBar links={props.links} />
		</>
	);
}
