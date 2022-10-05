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
	PasswordInput,
	TextInput,
	Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import logo from "../images/logo.png";
import { useRouter } from "next/router";
import useAuth from "../util/useAuth";

const useStyles = createStyles((theme) => ({
	card: {
		width: "26rem",
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[4],
	},

	buttonText: {
		color: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[0],
	},
}));

export default function LoginPage() {
	const form = useForm({
		initialValues: {
			email: "",
			password: "",
		},
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
		},
	});

	const { classes, cx } = useStyles();
	const status = useAuth();

	return (
		<Center style={{ height: "100vh" }}>
			<Group className="items-center justify-center">
				<Card className={cx(classes.card)} shadow="sm" p="lg" radius="md" withBorder>
					<form onSubmit={form.onSubmit((values) => console.log(values))}>
						<Stack spacing="md">
							<TextInput size="lg" placeholder="Email" {...form.getInputProps("email")} />

							<PasswordInput size="lg" placeholder="Password" {...form.getInputProps("password")} />

							<Button type="submit" size="lg" color="milkTea.3" fullWidth radius="md">
								<Text weight={700} color="dark" size={26}>
									Login
								</Text>
							</Button>
						</Stack>
					</form>
					<Divider my="sm" label={<Text size={18}>or</Text>} labelPosition="center" />
					<Stack>
						<Link href="/register">
							<Button size="lg" color="milkTea.3" fullWidth radius="md">
								<Text weight={700} color="dark" size={26}>
									Register
								</Text>
							</Button>
						</Link>
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
					</Stack>
				</Card>
			</Group>
		</Center>
	);
}
