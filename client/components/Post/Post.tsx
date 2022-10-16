import React from "react";
import {
	useMantineColorScheme,
	Button,
	Text,
	Group,
	Avatar,
	Stack,
	ActionIcon,
} from "@mantine/core";
import Link from "next/link";
import { IconFlame, IconMessage } from "@tabler/icons";
export interface PostProps {
	username: string;
	avatarImage: string | undefined | null;
	body: string;
	likes: number;
}

export const Post = ({ body, username, avatarImage }: PostProps) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	return (
		<Stack className="rounded-md bg-bgPost p-6" spacing={7}>
			<Group>
				<Avatar src={avatarImage} radius="xl" />
				<Link href={`${username}`} passHref>
					<Text className="hover:underline" weight={700}>
						{username}
					</Text>
				</Link>
			</Group>
			<Text size="sm" className="my-3 break-all">
				{body}
			</Text>
			<Group className="mt-2">
				<ActionIcon color="dark" size="lg">
					<IconFlame size={100} strokeWidth={2} color={"orange"} />
				</ActionIcon>
				<ActionIcon color="dark" size="lg">
					<IconMessage size={100} strokeWidth={2} color={"orange"} />
				</ActionIcon>
			</Group>
		</Stack>
	);
};
