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
	PostByPostIdQuery,
} from "@gqlSDK/generated/generates";
import gqlClient from "@gqlSDK/clients/gqlClient";
import { useRouter } from "next/router";
import useUserStore from "stores/user";
import useDebounce from "hooks/useDebounce";
import { Body } from "components/Body/Body";
export interface PostProps {
	id: string;
	author?: NonNullable<PostByPostIdQuery["postByPostId"]>["author"];
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
	author,
	username,
	avatarImage,
	likesCount,
	isLikedByThisUser,
	commentsCount,
	isOnClick = true,
}: PostProps) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const { mutate: DeletePost } = useDeletePostMutation<DeletePostMutation, Error>(gqlClient);
	const router = useRouter();

	const handleDelete = () => {
		console.log("delete post");
		DeletePost({ deletePostId: postId });
		router.replace(router.asPath);
	};

	return (
		<Stack
			className={`bg-bgPost p-6 ${isOnClick ? "post-border" : "post-border-plain"}`}
			spacing={7}
			// onClick={() => {
			// 	// prevents pushing to undefined route on the post page
			// 	if (isOnClick) {
			// 		router.push(`post/${postId}`);
			// 	}
			// }}
		>
			<Body
				id={postId}
				author={author}
				username={username}
				avatarImage={avatarImage}
				body={body}
				likesCount={likesCount}
				isLikedByThisUser={isLikedByThisUser}
				commentsCount={commentsCount}
				isOnClick={isOnClick}
				handleDelete={handleDelete}
			/>
		</Stack>
	);
};
