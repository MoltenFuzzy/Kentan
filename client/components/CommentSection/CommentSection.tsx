import gqlClient from "@gqlSDK/clients/gqlClient";
import {
	CommentsByPostIdQuery,
	CreateCommentInput,
	CreateCommentMutation,
	PostByPostIdQuery,
	useCreateCommentMutation,
} from "@gqlSDK/generated/generates";
import { Button, Divider, Stack, Textarea } from "@mantine/core";
import { Comment } from "components/Comment/Comment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useUserStore from "stores/user";
import { CommentForm } from "./CommentForm";

export interface CommentSectionProps {
	postId: string;
	// https://github.com/dotansimha/graphql-code-generator/issues/3084
	// comments: NonNullable<PostByPostIdQuery["postByPostId"]>["comments"];
	comments: CommentsByPostIdQuery["commentsByPostId"];
}

export const CommentSection = ({ postId, comments }: CommentSectionProps) => {
	const { id: userId, name, avatar } = useUserStore();

	useEffect(() => {
		console.log(comments.map((comment) => comment.body));
	}, [comments]);

	return (
		<Stack className="rounded-md p-2 post-border-plain bg-bgPost" spacing={7}>
			<CommentForm postId={postId} />
			{comments.length === 0
				? null
				: comments.map((comment, index) => (
						<div key={index}>
							<Divider />
							<div className="p-6">
								{"author" in comment && (
									<Comment
										id={comment._id}
										username={comment.author.name}
										avatarImage={comment.author.avatarImage}
										body={comment.body}
										likesCount={0}
										isLikedByThisUser={false}
										commentsCount={0}
									/>
								)}
							</div>
						</div>
				  ))}
		</Stack>
	);
};
