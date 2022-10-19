import React from "react";
import {
	useMantineColorScheme,
	Button,
	Text,
	Group,
	Avatar,
	Stack,
	ActionIcon,
	Menu,
} from "@mantine/core";
import Link from "next/link";
import { IconFlame, IconMessage, IconDots, IconTrash } from "@tabler/icons";
import { DeletePostMutation, useDeletePostMutation } from "@gqlSDK/generated/generates";
import gqlClient from "@gqlSDK/clients/gqlClient";
import { useRouter } from "next/router";
export interface PostProps {
	id: string;
	username: string;
	avatarImage: string | undefined | null;
	body: string;
	likes: number;
	comments?: string[];
}

// TODO: add ... icon to the right of the post w/ a dropdown menu that has a delete option
export const Post = ({ id, body, username, avatarImage, likes, comments }: PostProps) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	//! might be a bad idea to put mutations in the component
	const { mutate: DeletePost } = useDeletePostMutation<DeletePostMutation, Error>(gqlClient);
	const router = useRouter();
	const [likeValue, setLikeValue] = React.useState(likes);
	const [isLiked, setIsLiked] = React.useState(false);

	const handleDelete = () => {
		console.log("delete");
		DeletePost({ deletePostId: id });
		router.replace(router.asPath);
	};

	return (
		<Stack className="post-border bg-bgPost p-6 cursor-pointer" spacing={7}>
			<Group className="justify-between">
				<Group>
					<Avatar src={avatarImage} radius="xl" />
					<Link href={`${username}`} passHref>
						<Text className="hover:underline" weight={700}>
							{username}
						</Text>
					</Link>
				</Group>
				<Group className="self-start">
					<Menu shadow="md" width={100}>
						<Menu.Target>
							<ActionIcon>
								<IconDots />
							</ActionIcon>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item color="red" onClick={handleDelete}>
								Delete
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</Group>
			<Text size="sm" className="my-3 break-all">
				{body}
			</Text>
			<Group className="mt-1">
				<ActionIcon
					size="lg"
					onClick={() => {
						if (!isLiked) {
							setLikeValue(likeValue + 1);
							setIsLiked(true);
						} else {
							setLikeValue(likeValue - 1);
							setIsLiked(false);
						}
					}}
				>
					<IconFlame size={100} strokeWidth={2} color={"orange"} />
					<Text>{likeValue}</Text>
				</ActionIcon>
				<ActionIcon size="lg">
					<IconMessage size={100} strokeWidth={2} color={"orange"} />
					<Text>{comments?.length}</Text>
				</ActionIcon>
			</Group>
			{/* <Group>{comments?.map((comment) => comment)}</Group> */}
		</Stack>
	);
};
