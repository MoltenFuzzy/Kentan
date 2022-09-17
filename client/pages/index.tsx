import React from "react";
import { Button, Group, Card, Image, Text } from "@mantine/core";
import Link from "next/link";
import logo from "../images/logo.png";

export default function IndexPage() {
	return (
		<>
			{/* <ColorSchemeToggle /> */}
			<Group
				className="items-center justify-center h-screen"
				position="center"
				// spacing={125}
			>
				<Image width={600} src={logo.src} alt="logo"></Image>
				<Card shadow="sm" p="lg" radius="md" withBorder>
					<Group className="w-96">
						<Link href="/login">
							<Button color="blue" fullWidth radius="md">
								<Text size="md">Login</Text>
							</Button>
						</Link>
						<Link href="/register">
							<Button color="pink" fullWidth radius="md">
								<Text size="md">Register</Text>
							</Button>
						</Link>
					</Group>
				</Card>
			</Group>
		</>
	);
}
