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
	Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { IconMessageCircle, IconBell, IconBellX } from "@tabler/icons";
import Link from "next/link";
import useStyles from "./NavBar.styles";
import logo from "../../images/logo.png";
import { signOut, useSession } from "next-auth/react";

export interface NavBarProps {
	links: { link: string; label: string }[];
}

const links = [
	{ link: "messages", label: "messages" },
	{ link: "notifications", label: "notifications" },
];

export function NavBar({ marginBottom }: { marginBottom: number }) {
	const [opened, { toggle }] = useDisclosure(false);
	const { classes, cx } = useStyles();
	const { data: session } = useSession();

	const items = links.map((link, index) => (
		<Link key={index} href={link.link}>
			<span className={cx(classes.link)}>
				{link.label === "messages" && (
					<IconMessageCircle size={35} strokeWidth={2} color={"#FFFFFF"} />
				)}
				{link.label === "notifications" && <IconBell size={35} strokeWidth={2} color={"#FFFFFF"} />}
			</span>
		</Link>
	));

	return (
		<Header className={classes.head} height={56} mb={marginBottom}>
			<Container size="xl" className={classes.header}>
				<Link href="/">
					<Image width={45} src={logo.src} alt="logo" />
				</Link>
				<Autocomplete
					size="sm"
					className={classes.search}
					placeholder="Search"
					data={[]} // put cached search history here
				/>
				<Group spacing={10} className={classes.links}>
					{items}
					<div className={cx(classes.link)}>
						<Link href={`${session?.user?.name}`}>
							<Avatar src={session?.user?.image} color="green" size={35} radius="xl" />
						</Link>
					</div>

					<Button color="orange" onClick={() => signOut()}>
						Log out
					</Button>
				</Group>
				<Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
			</Container>
		</Header>
	);
}
