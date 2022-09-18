import React from "react";
import {
	Button,
	Group,
	Card,
	Image,
	Text,
	createStyles,
	Divider,
	Center,
	Space,
} from "@mantine/core";
import Link from "next/link";
import logo from "../images/logo.png";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[9]
				: theme.colors.gray[4],
	},

	buttonText: {
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[9]
				: theme.colors.gray[0],
	},
}));

export default function IndexPage() {
	const { classes, cx } = useStyles();

	return (
		<Center style={{ height: "100vh" }}>
			<Group className="items-center justify-center">
				<div>
					<Image height={500} width={500} src={logo.src} alt="logo"></Image>
				</div>
				<Space w={120} />
				<Card
					className={cx(classes.card)}
					shadow="sm"
					p="lg"
					radius="md"
					withBorder
				>
					<Group className="w-96">
						<Link href="/login">
							<Button size="lg" color="milkTea.3" fullWidth radius="md">
								<Text weight={700} color="dark" size={26}>
									Login
								</Text>
							</Button>
						</Link>
						<Link href="/register">
							<Button size="lg" color="milkTea.3" fullWidth radius="md">
								<Text weight={700} color="dark" size={26}>
									Register
								</Text>
							</Button>
						</Link>
					</Group>
					<Divider
						my="sm"
						label={<Text size={18}>or</Text>}
						labelPosition="center"
					/>
				</Card>
			</Group>
		</Center>
	);
}
