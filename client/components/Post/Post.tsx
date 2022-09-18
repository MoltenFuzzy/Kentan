import React from "react";
import { Button, Box, useMantineColorScheme, Text } from "@mantine/core";

export interface PostProps {
	className?: string;
	body?: string;
}

const Post = (props: PostProps) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	return (
		<div className="bg-zinc-700 rounded-md">
			<Text size="sm">{props.body}</Text>
			<Button>Like</Button>
			<Button>Reply</Button>
		</div>
	);
};

export { Post };
