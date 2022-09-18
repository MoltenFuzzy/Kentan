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
	Avatar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { IconMessageCircle, IconBell, IconBellX } from "@tabler/icons";
import Link from "next/link";
import useStyles from "./NavBar.styles";
import logo from "../../images/logo.png";

export interface NavBarProps {
	links: { link: string; label: string }[];
}

export function NavBar({ links }: NavBarProps) {
	const [opened, { toggle }] = useDisclosure(false);
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
		<Header className={classes.head} height={70} mb={30}>
			<Container size="xl" className={classes.header}>
				<Link href="/">
					<Image width={80} src={logo.src} alt="logo" />
				</Link>
				<Autocomplete
					size="md"
					className={classes.search}
					placeholder="Search"
					data={[]} // put cached search history here
				/>
				<Group spacing={10} className={classes.links}>
					{items}
					<div className={cx(classes.link)}>
						<Avatar color="green" size={35} radius="xl">
							KP
						</Avatar>
					</div>
					<div className={cx(classes.link)}>
						<ColorSchemeToggle />
					</div>
				</Group>
				<Burger
					opened={opened}
					onClick={toggle}
					className={classes.burger}
					size="sm"
				/>
				{/* <Box className={classes.toggle}>
					<ColorSchemeToggle />
				</Box> */}
			</Container>
		</Header>
	);
}
