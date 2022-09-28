import React from "react";
import {
	useMantineColorScheme,
	Button,
	Text,
	Group,
	Avatar,
	Stack,
} from "@mantine/core";

export interface PostProps {
	body: string;
	username: string;
	avatar: string;
}

const Post = ({ body, username, avatar }: PostProps) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	return (
		<Group className="bg-zinc-700 rounded-md align p-2">
			<Avatar src={avatar} className="mb-16" color="green" radius="xl" />
			<Stack spacing={7}>
				<Text weight={700}>{username}</Text>
				<Text size="sm">{body}</Text>
				<Group className="mt-2">
					<Button size="xs">Like</Button>
					<Button size="xs">Reply</Button>
				</Group>
			</Stack>
		</Group>
	);
};

export { Post };
