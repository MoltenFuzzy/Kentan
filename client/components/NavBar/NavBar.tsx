import { useState } from "react";
import {
	Header,
	Autocomplete,
	Container,
	Group,
	Burger,
	Text,
	Box,
	Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { IconMessageCircle, IconBell } from "@tabler/icons";
import Link from "next/link";
import useStyles from "./NavBar.styles";
import logo from "../../images/logo.png";

export interface NavBarProps {
	links: { link: string; label: string }[];
}

export function NavBar({ links }: NavBarProps) {
	const [opened, { toggle }] = useDisclosure(false);
	const [active, setActive] = useState(links[0].link);
	const { classes, cx } = useStyles();

	const items = links.map((link, index) => (
		// <Link key={index} href={link.link}>
		<span className={cx(classes.link)}>
			{link.label === "messages" && (
				<IconMessageCircle size={35} strokeWidth={2} color={"#DDA170"} />
			)}
			{link.label === "notifications" && (
				<IconBell size={35} strokeWidth={2} color={"#DDA170"} />
			)}
		</span>
		// </Link>
	));

	return (
		<Header className={classes.head} height={70} mb={50}>
			<Container size="xl" className={classes.header}>
				<Image width={100} src={logo.src} alt="logo" />
				<Autocomplete
					size="md"
					className={classes.search}
					placeholder="Search"
					data={[]} // put cached search history here
				/>
				<Group spacing={10} className={classes.links}>
					{items}
				</Group>
				{/* check if user logged in to render */}
				<Group className={classes.register}>
					<Text size="md">Logout</Text>
				</Group>
				<Burger
					opened={opened}
					onClick={toggle}
					className={classes.burger}
					size="sm"
				/>
				<Box className={classes.toggle}>
					<ColorSchemeToggle />
				</Box>
			</Container>
		</Header>
	);
}
