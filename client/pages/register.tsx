import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import gqlClient from "../src/clients/gqlClient";
import {
	CreateUserMutation,
	useCreateUserMutation,
} from "../src/generated/generates";

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
						placeholder="Password"
						label="Password"
						description="Password must include at least one letter, number and special character"
						withAsterisk
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
		</>
	);
}
