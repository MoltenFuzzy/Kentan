import React from "react";
import { useMantineColorScheme, Button, Text, Group, Avatar, Stack } from "@mantine/core";
import Link from "next/link";

export interface PostProps {
	username: string;
	avatarImage: string | undefined | null;
	body: string;
	likes: number;
}

const Post = ({ body, username, avatarImage }: PostProps) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	return (
		<Stack className="rounded-md bg-bgPost p-6" spacing={7}>
			{/* <div className="flex items-center child:mr-4">
				<Avatar src={avatarImage} radius="xl" />
				<Text weight={700}>{username}</Text>
			</div> */}
			<Link href="/hello" passHref>
				<Group>
					<Avatar src={avatarImage} radius="xl" />
					<Text className="hover:underline" weight={700}>
						{username}
					</Text>
				</Group>
			</Link>
			<Text size="sm" className="my-3 break-all">
				{body}
			</Text>
			<Group className="mt-2">
				<Button size="xs">Like</Button>
				<Button size="xs">Reply</Button>
			</Group>
		</Stack>
	);
};

export { Post };
