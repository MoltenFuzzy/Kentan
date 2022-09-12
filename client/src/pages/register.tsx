import { useEffect } from "react";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { gql, GraphQLClient } from "graphql-request";

const endpoint = "http://localhost:4000/";

interface User {
	username: string;
	password: string;
	email: string;
}

export default function Register() {
	const form = useForm({
		initialValues: {
			username: "",
			email: "",
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
		},
	});

	const graphQLClient = new GraphQLClient(endpoint, {
		headers: {
			authorization: "Bearer MY_TOKEN",
		},
	});

	const mutation = gql`
		mutation CreateUser($userInput: CreateUserInput!) {
			createUser(UserInput: $userInput) {
				username
				email
			}
		}
	`;

	const { status, data, error, isLoading, mutate } = useMutation((newUser) => {
		return graphQLClient.request(mutation, newUser);
	});

	return (
		<Box sx={{ maxWidth: 300 }} mx="auto">
			<form onSubmit={form.onSubmit((values) => mutate(values))}>
				<TextInput
					withAsterisk
					label="Username"
					placeholder="Username"
					{...form.getInputProps("username")}
				/>

				<TextInput
					withAsterisk
					label="Email"
					placeholder="Email"
					{...form.getInputProps("email")}
				/>

				<Group position="right" mt="md">
					<Button type="submit">Submit</Button>
				</Group>
			</form>
		</Box>
	);
}
