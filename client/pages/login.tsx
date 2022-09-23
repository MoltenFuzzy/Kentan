import React, { useEffect, useState } from "react";
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
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import logo from "../images/logo.png";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { useRouter } from "next/router";

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

export default function LoginPage() {
	const { classes, cx } = useStyles();

	const router = useRouter();
	const { status } = useSession();

	useEffect(() => {
		if (status === "authenticated") {
			void router.push("/");
		}
	}, [status]);

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
					<Button
						size="lg"
						color="milkTea.3"
						fullWidth
						radius="md"
						onClick={() => signIn("google")}
					>
						<Text weight={700} color="dark" size={26}>
							Sign in with Google
						</Text>
					</Button>
				</Card>
			</Group>
		</Center>
	);
}
