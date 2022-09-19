import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import gqlClient from "../src/clients/gqlClient";
import {
	CreateUserMutation,
	useCreateUserMutation,
} from "../src/generated/generates";

export default function RegisterPage() {
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

	const { mutate, data } = useCreateUserMutation<CreateUserMutation, Error>(
		gqlClient,
		{}
	);

	return (
		<>
			<Box sx={{ maxWidth: 300 }} mx="auto">
				<form
					onSubmit={form.onSubmit((values) => mutate({ userInput: values }))}
				>
					<TextInput
						withAsterisk
						label="Username"
						placeholder="Username"
						{...form.getInputProps("username")}
					/>

					<PasswordInput
						withAsterisk
						placeholder="Password"
						label="Password"
						description="Password must include at least one letter, number and special character"
						{...form.getInputProps("password")}
					/>

					<TextInput
						withAsterisk
						label="Email"
						placeholder="Email"
						{...form.getInputProps("email")}
					/>

					<Group position="right" mt="md">
						<Button type="submit">Register</Button>
					</Group>
				</form>
			</Box>
		</>
	);
}
