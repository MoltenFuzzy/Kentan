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
	Container,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";

const useStyles = createStyles((theme) => ({
	card: {
		width: "26rem",
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[4],
	},

	buttonText: {
		color: theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[0],
	},
}));

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context);

	if (session) {
		return {
			redirect: {
				destination: "/home",
				permanent: false,
			},
		};
	}

	return {
		props: { session },
	};
}

interface PageProps {
	pageProps: {
		session: Session;
	};
}

export default function LoginPage({ pageProps: { session } }: PageProps) {
	const { classes, cx } = useStyles();
	const form = useForm({
		initialValues: {
			email: "",
			password: "",
		},
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
		},
	});

	return (
		//TODO: FIX RESPONSIVENESS
		<div className="background h-screen p-12">
			<Container className="mt-18">
				<h1 className="text-center font-libre text-5xl text-orange">KENTAN</h1>
				<Space h="lg"></Space>
				<Text size={30} color="white" className="p-5 text-center">
					Login
				</Text>
				<form onSubmit={form.onSubmit((values) => console.log(values))}>
					<Stack spacing="lg">
						<TextInput
							styles={{
								input: { borderColor: "#d0d4d9ab", background: "#333333" },
							}}
							size="lg"
							radius="md"
							placeholder="Email"
							{...form.getInputProps("email")}
						/>
						<PasswordInput
							styles={{
								input: { borderColor: "#d0d4d9ab", background: "#333333" },
							}}
							size="lg"
							radius="md"
							placeholder="Password"
						/>

						<Button type="submit" color="orange" radius={5} size="lg" className="shadow-lg">
							<Text weight={700} size={20}>
								Login
							</Text>
						</Button>
					</Stack>
				</form>
				<Divider my="sm" label={<Text size={18}>or</Text>} labelPosition="center" />
				<Stack>
					<Link href="/register">
						<Button color="orange" radius={5} size="lg" className="shadow-lg">
							<Text weight={700} size={20}>
								Register
							</Text>
						</Button>
					</Link>
					<Button
						type="submit"
						color="orange"
						radius={5}
						size="lg"
						className="mb-10 shadow-lg"
						onClick={() => signIn("google")}
					>
						<Text weight={700} size={20}>
							Login With Google
						</Text>
					</Button>
				</Stack>
			</Container>
		</div>
	);
}
