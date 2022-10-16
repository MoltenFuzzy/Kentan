import {
	TextInput,
	Text,
	Button,
	Group,
	Box,
	PasswordInput,
	Container,
	Stack,
	Center,
	Space,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import gqlClient from "../src/clients/gqlClient";
import { CreateUserMutation, useCreateUserMutation } from "../src/generated/generates";

export default function RegisterPage() {
	const form = useForm({
		initialValues: {
			username: "",
			password: "",
			email: "",
		},

		validate: {
			username: (value) =>
				/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/.test(value)
					? null
					: "Invalid username",
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
		},
	});

	const { mutate } = useCreateUserMutation<CreateUserMutation, Error>(gqlClient, {});

	return (
		//TODO: FIX RESPONSIVENESS
		<div className="background h-screen p-12">
			<Container className="mt-18">
				<h1 className="text-center font-libre text-5xl text-orange">KENTAN</h1>
				<Space h="lg"></Space>
				<Text size={30} color="white" className="p-5 text-center">
					Registration
				</Text>
				<form>
					<Stack spacing="lg">
						<TextInput
							styles={{ input: { borderColor: "#d0d4d9ab", background: "#333333" } }}
							size="lg"
							radius="md"
							placeholder="Username"
							{...form.getInputProps("username")}
						/>
						<TextInput
							styles={{ input: { borderColor: "#d0d4d9ab", background: "#333333" } }}
							size="lg"
							radius="md"
							placeholder="Email"
							{...form.getInputProps("email")}
						/>
						<PasswordInput
							styles={{ input: { borderColor: "#d0d4d9ab", background: "#333333" } }}
							size="lg"
							radius="md"
							placeholder="Password"
						/>
						<PasswordInput
							styles={{ input: { borderColor: "#d0d4d9ab", background: "#333333" } }}
							size="lg"
							radius="md"
							placeholder="Verify Password"
						/>

						<Button color="orange" radius={5} size="lg" className="mb-10 shadow-lg">
							<Text weight={700} size={20}>
								Register Now
							</Text>
						</Button>
					</Stack>
				</form>
			</Container>
		</div>
	);
}
