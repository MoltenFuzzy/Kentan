import React, { SyntheticEvent } from "react";
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
import {
	DeletePostMutation,
	useDeletePostMutation,
	LikePostMutation,
	useLikePostMutation,
	UnlikePostMutation,
	useUnlikePostMutation,
} from "@gqlSDK/generated/generates";
import gqlClient from "@gqlSDK/clients/gqlClient";
import { useRouter } from "next/router";
import useUserStore from "stores/user";
export interface PostProps {
	id: string;
	username: string;
	avatarImage: string | undefined | null;
	body: string;
	likesCount: number;
	isLikedByThisUser: boolean;
	commentsCount: number;
	isOnClick?: boolean;
}

// TODO: add ... icon to the right of the post w/ a dropdown menu that has a delete option
export const Post = ({
	id: postId,
	body,
	username,
	avatarImage,
	likesCount,
	isLikedByThisUser,
	commentsCount,
	isOnClick = true,
}: PostProps) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	//! might be a bad idea to put mutations in the component
	const { mutate: DeletePost } = useDeletePostMutation<DeletePostMutation, Error>(gqlClient);
	const { mutate: LikePost } = useLikePostMutation<LikePostMutation, Error>(gqlClient);
	const { mutate: UnlikePost } = useUnlikePostMutation<UnlikePostMutation, Error>(gqlClient);
	const [likesValue, setLikesValue] = React.useState(likesCount);
	// const [isLiked, setIsLiked] = React.useState(data?.likePost.likedByUsers?.includes(userId!));
	const [isLiked, setIsLiked] = React.useState(isLikedByThisUser); //! NOTE: STATE NOT PERSISTED
	const { id: userId } = useUserStore();
	const router = useRouter();

	// https://stackoverflow.com/questions/54865764/react-usestate-does-not-reload-state-from-props
	// essentially sync state with props
	// WEIRD BUG THAT I DON'T UNDERSTAND BUT THIS FIXES IT BY SETTING STATE BACK TO THE VALUE IT SHOULD BE
	// BUG: when you like a post and then refresh the page the like count will be of the previous post under it
	React.useEffect(() => {
		setLikesValue(likesCount);
		setIsLiked(isLikedByThisUser);
	}, [likesCount, isLikedByThisUser]); // when the props change, set the state to the props

	const handleDelete = (e: SyntheticEvent) => {
		console.log("delete post");
		DeletePost({ deletePostId: postId });
		router.replace(router.asPath);
	};

	return (
		<Stack
			className={`bg-bgPost p-6 ${isOnClick ? "post-border cursor-pointer" : "post-border-plain"}`}
			spacing={7}
			onClick={() => {
				// prevents pushing to undefined route on the post page
				if (isOnClick) {
					router.push(`post/${postId}`);
				}
			}}
		>
			<Group className="justify-between">
				<Group>
					<Avatar src={avatarImage} radius="xl" />
					<Text
						onClick={(e) => {
							e.stopPropagation();
							router.push(username);
						}}
						className="hover:underline"
						weight={700}
					>
						{username}
					</Text>
				</Group>
				<Group className="self-start" onClick={(e) => e.stopPropagation()}>
					<Menu shadow="md" width={100} closeOnClickOutside>
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
			<Text size="sm" className="my-3 whitespace-pre-line">
				{body}
			</Text>
			<Group className="mt-1">
				<ActionIcon
					size="lg"
					onClick={(e) => {
						// https://stackoverflow.com/questions/13966734/child-element-click-event-trigger-the-parent-click-event
						e.stopPropagation();
						if (!isLiked) {
							LikePost({ userId, postId });
							setLikesValue(likesValue + 1);
							setIsLiked(true);
						} else {
							UnlikePost({ userId, postId });
							setLikesValue(likesValue - 1);
							setIsLiked(false);
						}
					}}
				>
					<IconFlame size={100} strokeWidth={2} color={"orange"} />
					<Text>{likesValue}</Text>
				</ActionIcon>
				<ActionIcon size="lg">
					<IconMessage size={100} strokeWidth={2} color={"orange"} />
					<Text>{commentsCount}</Text>
				</ActionIcon>
			</Group>
		</Stack>
	);
};
