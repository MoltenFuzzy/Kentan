import gqlClient from "@gqlSDK/clients/gqlClient";
import {
	Comment as CommentType,
	CreateCommentInput,
	CreateCommentMutation,
	useCreateCommentMutation,
} from "@gqlSDK/generated/generates";
import { Button, Divider, Stack, Textarea } from "@mantine/core";
import { Comment } from "components/Comment/Comment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUserStore from "stores/user";

interface CommentFormProps {
	postId: string;
}

export const CommentForm = ({ postId }: CommentFormProps) => {
	const { id: userId, name, avatar } = useUserStore();
	const { mutate: createComment } = useCreateCommentMutation<CreateCommentMutation, Error>(
		gqlClient,
		{}
	);
	const [value, setValue] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleComment = () => {
		const newCommentInput: CreateCommentInput = {
			author: {
				_id: userId,
				name: name,
				avatarImage: avatar,
			},
			body: value,
			postId: {
				_id: postId,
			},
		};

		console.log(newCommentInput);
		// dont allow empty posts
		if (newCommentInput.body.length === 0) {
			setError("Post cannot be empty");
			return;
		}

		// when we create post it does return a post we can use to update the state
		// ^ THIS WILL BE SLOWER SINCE WE HAVE TO WAIT FOR THE MUTATION TO FINISH
		createComment({ commentInput: newCommentInput, populate: true });
		setError(""); // reset error state
		setValue("");
		console.log(router.asPath);
		//BUG: this is not updating the site
		router.replace(router.asPath);
	};

	return (
		<Stack spacing="xs">
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
		</Stack>
	);
};
