import React from "react";
import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import gqlClient from "../src/clients/gqlClient";
import { GetUsersQuery, useGetUsersQuery } from "../src/generated/generates";

export default function LoginPage() {
	const form = useForm({
		initialValues: {
			username: "",
			password: "",
			email: "",
		},

		validate: {
			username: (value) =>
				/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/.test(
					value
				)
					? null
					: "Invalid username",
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
		},
	});

	return (
		<>
			<Box sx={{ maxWidth: 300 }} mx="auto">
				{/* on submit verify creds, return true if valid?? */}
				<form onSubmit={form.onSubmit((values) => console.log(values))}>
					<TextInput
						label="Username"
						placeholder="Username"
						{...form.getInputProps("username")}
					/>

					<PasswordInput
						placeholder="Password"
						label="Password"
						{...form.getInputProps("password")}
					/>

					<Group position="right" mt="md">
						<Button type="submit">Login</Button>
					</Group>
				</form>
			</Box>
		</>
	);
}
