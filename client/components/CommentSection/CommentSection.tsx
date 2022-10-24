import gqlClient from "@gqlSDK/clients/gqlClient";
import {
	Comment,
	CreateCommentInput,
	CreateCommentMutation,
	useCreateCommentMutation,
} from "@gqlSDK/generated/generates";
import {
	ActionIcon,
	Avatar,
	Button,
	Divider,
	Group,
	Menu,
	Stack,
	Text,
	Textarea,
} from "@mantine/core";
import { Body } from "components/Body/Body";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useUserStore from "stores/user";

export interface CommentSectionProps {
	comments: Comment[];
}

export const CommentSection = ({ comments }: CommentSectionProps) => {
	const { mutate: createComment } = useCreateCommentMutation<
		CreateCommentMutation,
		Error
	>(gqlClient, {});
	const [value, setValue] = useState("");
	const [error, setError] = useState("");
	const { id: userId, name, avatar } = useUserStore();
	const router = useRouter();

	const handleDelete = () => {
		console.log("delete comment");
		router.replace(router.asPath);
	};

	const handleComment = () => {
		// use event target value over refs
		//* ^only use refs when you dont want a rerender or extract to component
		const newCommentInput: CreateCommentInput = {
			author: {
				_id: userId,
				name: name,
				avatarImage: avatar,
			},
			body: value,
			postId: {
				_id: "63528abbcea5a8a6baa7283b",
			},
		};
		// dont allow empty posts
		if (newCommentInput.body.length === 0) {
			setError("Post cannot be empty");
			return;
		}

		// TODO: Add post fail handling
		// when we create post it does return a post we can use to update the state
		// ^ THIS WILL BE SLOWER SINCE WE HAVE TO WAIT FOR THE MUTATION TO FINISH
		createComment({ commentInput: newCommentInput });
		resetState(setError, setValue); // set value to empty string after posting
		router.replace(router.asPath);
	};

	useEffect(() => {
		console.log(comments);
	});

	return (
		<Stack className="rounded-md p-2 post-border-plain bg-bgPost" spacing={7}>
			<Textarea
				placeholder="Reply to this post"
				size="lg"
				minRows={3}
				error={error}
				value={value}
				onChange={(event) => setValue(event.currentTarget.value)}
			/>
			<div className="flex justify-end">
				<Button
					onClick={handleComment}
					disabled={value.length === 0}
					color="orange"
					radius={5}
					size="sm"
					className="shadow-lg"
				>
					Post
				</Button>
			</div>
			{comments.length === 0
				? null
				: comments.map((comment, index) => (
						<>
							<Divider />
							<div className="p-6">
								<Body
									key={index}
									id={comment?._id!}
									username={comment?.author?.name!}
									avatarImage={comment?.author?.avatarImage!}
									body={comment?.body!}
									likesCount={comment?.likesCount!}
									isLikedByThisUser={comment?.likedByUsers?.includes(userId)!}
									commentsCount={comment?.commentsCount!}
									handleDelete={handleDelete}
								/>
							</div>
						</>
				  ))}
		</Stack>
	);
};

function resetState(
	setError: React.Dispatch<React.SetStateAction<string>>,
	setValue: React.Dispatch<React.SetStateAction<string>>
) {
	setError(""); // reset error state
	setValue("");
}
