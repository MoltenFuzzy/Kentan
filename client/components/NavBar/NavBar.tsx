import { useState, useEffect } from "react";
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
	createStyles,
	ActionIcon,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { ColorSchemeToggle } from "../ColorSchemeToggle/ColorSchemeToggle";
import { IconMessageCircle, IconBell, IconBellX } from "@tabler/icons";
import Link from "next/link";
import useStyles from "./NavBar.styles";
import logo from "../../images/logo.png";
import { signOut, useSession } from "next-auth/react";

// COMPONENT REFERENCE: https://ui.mantine.dev/category/headers

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
	const matches = useMediaQuery("(min-width: 900px)");
	const { data: session } = useSession();

	const items = links.map((link, index) => (
		<Link key={index} href={link.link}>
			<span className={cx(classes.link)}>
				{link.label === "messages" && (
					<IconMessageCircle size={30} strokeWidth={2} color={"#FFFFFF"} />
				)}
				{link.label === "notifications" && <IconBell size={30} strokeWidth={2} color={"#FFFFFF"} />}
			</span>
		</Link>
	));

	return (
		<Header className={classes.header} height={56} mb={marginBottom}>
			<Container size={1600} className={classes.container}>
				<div className="flex justify-center">
					{/* <Link href="/home">
						<Image width={45} src={logo.src} alt="logo" />
					</Link> */}
					<Link href="/home">
						<Title color="orange" weight={700} size={35} className="font-libre mr-5">
							KENTAN
						</Title>
					</Link>
				</div>
				<div className={classes.search}>
					<Autocomplete
						size="sm"
						placeholder="Search"
						data={[]} // put cached search history here
					/>
				</div>
				{matches ? (
					<div>
						{items}
						<div className={cx(classes.link)}>
							<Link href={`/user/${session?.user?.name}`}>
								<Avatar src={session?.user?.image} size={35} radius="xl" />
							</Link>
						</div>
						<Button
							className="ml-10"
							color="orange"
							onClick={() =>
								signOut({
									callbackUrl: `${window.location.origin}`,
								})
							}
						>
							Log out
						</Button>
					</div>
				) : (
					<Burger opened={closed} onClick={toggle} size="sm" className="justify-self-end" />
				)}
			</Container>
		</Header>
	);
}
