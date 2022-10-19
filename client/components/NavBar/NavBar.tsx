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
	createStyles,
	ActionIcon,
	Title,
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

// const useStyles = createStyles(() => ({
// 	container: {
// 		display: "grid",
// 		gridTemplateColumns: "1fr auto 1fr",
// 		"& > *:last-child": {
// 			whiteSpace: "nowrap",
// 			textAlign: "right",
// 		},
// 	},
// }));

export function NavBar({ marginBottom }: { marginBottom: number }) {
	const [opened, { toggle }] = useDisclosure(false);
	const { classes, cx } = useStyles();
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
					<Link href="/home">
						<Image width={45} src={logo.src} alt="logo" />
					</Link>
					{/* <Title color="orange" weight={700} size={35} className="font-libre">
						KENTAN
					</Title> */}
				</div>
				<div className={classes.center}>
					<Autocomplete
						size="md"
						placeholder="Search"
						data={[]} // put cached search history here
					/>
				</div>
				<div>
					{items}
					<div className={cx(classes.link)}>
						<Link href={`${session?.user?.name}`}>
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
			</Container>
		</Header>
	);

	// return (
	// 	<Header className={classes.head} height={56} mb={marginBottom}>
	// 		<Container size={1200} className={classes.header}>
	// 			<div className="flex grow-1 justify-center">
	// 				<Link href="/home" className="mr-auto">
	// 					<Image width={40} src={logo.src} alt="logo" />
	// 				</Link>
	// 			</div>
	// 			<div className="flex grow-1 justify-center">
	// 				<Autocomplete
	// 					size="sm"
	// 					className={classes.search}
	// 					placeholder="Search"
	// 					data={[]} // put cached search history here
	// 				/>
	// 			</div>
	// 			<div className="flex grow-1 justify-center">
	// 				<Button
	// 					className="ml-auto"
	// 					color="orange"
	// 					onClick={() =>
	// 						signOut({
	// 							callbackUrl: `${window.location.origin}`,
	// 						})
	// 					}
	// 				>
	// 					Log out
	// 				</Button>
	// 				{items}
	// 				<div className={cx(classes.link)}>
	// 					<Link href={`${session?.user?.name}`}>
	// 						<Avatar src={session?.user?.image} size={35} radius="xl" />
	// 					</Link>
	// 				</div>
	// 			</div>
	// 			<Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
	// 		</Container>
	// 	</Header>
	// );
}
