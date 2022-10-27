import gqlClient from "@gqlSDK/clients/gqlClient";
import {
	DeletePostMutation,
	LikePostMutation,
	PostByPostIdQuery,
	UnlikePostMutation,
	useDeletePostMutation,
	useLikePostMutation,
	useUnlikePostMutation,
} from "@gqlSDK/generated/generates";
import { Group, Avatar, Menu, ActionIcon, Text } from "@mantine/core";
import { IconDots, IconFlame, IconMessage } from "@tabler/icons";
import useDebounce from "hooks/useDebounce";
import { useRouter } from "next/router";
import React, { SyntheticEvent } from "react";
import useUserStore from "stores/user";

export interface BodyProps {
	id: string;
	author?: NonNullable<PostByPostIdQuery["postByPostId"]>["author"];
	username: string;
	avatarImage: string | undefined | null;
	body: string;
	likesCount: number;
	isLikedByThisUser: boolean;
	commentsCount: number;
	isOnClick?: boolean;
	handleDelete: (e?: SyntheticEvent) => void;
}

export const Body = ({
	id: postId,
	body,
	author,
	username,
	avatarImage,
	likesCount,
	isLikedByThisUser,
	commentsCount,
	isOnClick,
	handleDelete,
}: BodyProps) => {
	const { mutate: LikePost } = useLikePostMutation<LikePostMutation, Error>(gqlClient);
	const { mutate: UnlikePost } = useUnlikePostMutation<UnlikePostMutation, Error>(gqlClient);
	const [likesValue, setLikesValue] = React.useState(likesCount);
	const [isLiked, setIsLiked] = React.useState(isLikedByThisUser); //! NOTE: STATE NOT PERSISTED
	const { id: userId } = useUserStore();
	const router = useRouter();
	const debouncedLike = useDebounce(isLiked, 500);

	// https://stackoverflow.com/questions/54865764/react-usestate-does-not-reload-state-from-props
	// essentially sync state with props
	// WEIRD BUG THAT I DON'T UNDERSTAND BUT THIS FIXES IT BY SETTING STATE BACK TO THE VALUE IT SHOULD BE
	// BUG: when you like a post and then refresh the page the like count will be of the previous post under it
	React.useEffect(() => {
		setLikesValue(likesCount);
		setIsLiked(isLikedByThisUser);
	}, [likesCount, isLikedByThisUser]); // when the props change, set the state to the props

	return (
		<>
			<Group className="justify-between">
				<Group>
					<Avatar src={avatarImage} radius="xl" />
					<Text
						onClick={(e) => {
							e.stopPropagation();
							router.push(`/user/${username}`);
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
							{userId === author?._id ? (
								<Menu.Item color="red" onClick={handleDelete}>
									Delete
								</Menu.Item>
							) : null}
							<Menu.Item color="orange">Report</Menu.Item>
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
				<ActionIcon
					size="lg"
					onClick={() => {
						// prevents pushing to undefined route on the post page
						if (isOnClick) {
							router.push(`post/${postId}`);
						}
					}}
				>
					<IconMessage size={100} strokeWidth={2} color={"orange"} />
					<Text>{commentsCount}</Text>
				</ActionIcon>
			</Group>
		</>
	);
};
