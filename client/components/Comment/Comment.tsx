import React, { SyntheticEvent } from "react";
import { useMantineColorScheme } from "@mantine/core";
import {
	CreateCommentInput,
	CreateCommentMutation,
	useCreateCommentMutation,
	DeleteCommentMutation,
	useDeleteCommentMutation,
} from "@gqlSDK/generated/generates";
import gqlClient from "@gqlSDK/clients/gqlClient";
import { useRouter } from "next/router";
import { Body } from "components/Body/Body";

export interface CommentProps {
	id: string;
	username: string;
	avatarImage: string | undefined | null;
	body: string;
	likesCount: number;
	isLikedByThisUser: boolean;
	commentsCount: number;
}

// TODO: add ... icon to the right of the post w/ a dropdown menu that has a delete option
export const Comment = ({
	id: commentId,
	body,
	username,
	avatarImage,
	likesCount,
	isLikedByThisUser,
	commentsCount,
}: CommentProps) => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const { mutate: deleteComment } = useDeleteCommentMutation<DeleteCommentMutation, Error>(
		gqlClient,
		{}
	);
	const router = useRouter();

	const handleDelete = () => {
		console.log("delete comment");
		deleteComment({ deleteCommentId: commentId });
		router.replace(router.asPath);
	};

	return (
		<Body
			id={commentId}
			username={username}
			avatarImage={avatarImage}
			body={body}
			likesCount={likesCount}
			isLikedByThisUser={isLikedByThisUser}
			commentsCount={commentsCount}
			handleDelete={handleDelete}
		/>
	);
};
